import { saveGame } from "../utils/saveSnakeGame.js";

function sanitizeId(id) {
  if (!id || id === "null" || id === "undefined" || id.trim() === "") return null;
  return id;
}

// ── BOARD RULES ──────────────────────────────────────
const SNAKES = {
  99: 41, // large pink snake
  89: 53, // green snake
  76: 58, // teal snake
  66: 45, // hot-pink snake
  54: 31, // orange snake
  43: 18,
  40: 3,
  27: 5,  // small red snake
};

const LADDERS = {
  4: 25,
  13: 46,
  33: 49,
  50: 69,
  42: 63,
  62: 81,
  74: 92,
};

function applyRules(pos) {
  if (SNAKES[pos] !== undefined) return { pos: SNAKES[pos], kind: "snake" };
  if (LADDERS[pos] !== undefined) return { pos: LADDERS[pos], kind: "ladder" };
  return { pos, kind: null };
}

// ── STATE (shared across every SnakeAndLadder connection) ───
// Module-scoped so it persists across calls to the exported function below,
// the same way it did as top-level state in the old single-file version.
const rooms = {};
const waitingPlayers = [];
const waitingMeta = {}; // { socketId: { dbId, ingameId } }

async function persistGameEnd(io, roomId, winnerSocketId, reason = "win") {
  const room = rooms[roomId];
  if (!room) return;

  const durationSec = room.startedAt
    ? Math.round((Date.now() - room.startedAt) / 1000)
    : 0;

  for (const socketId of room.allPlayers) {
    const meta = room.playerMeta[socketId];
    if (!meta?.dbId) {
      console.log(`[DB] Skipping ${socketId} — no dbId (guest)`);
      continue;
    }

    const opponentSocketId = room.allPlayers.find((id) => id !== socketId);
    const opponentMeta = opponentSocketId ? room.playerMeta[opponentSocketId] : null;

    let result;
    if (reason === "disconnected" && socketId !== winnerSocketId) {
      result = "disconnected";
    } else {
      result = socketId === winnerSocketId ? "win" : "loss";
    }

    await saveGame({
      playerId: meta.dbId,
      ingameId: meta.ingameId,
      opponent: {
        playerId: opponentMeta?.dbId ?? null,
        ingameId: opponentMeta?.ingameId ?? "Unknown",
        isGuest: !opponentMeta?.dbId,
      },
      result,
      durationSec,
      snakesHit: room.stats[socketId]?.snakesHit ?? 0,
      laddersClimbed: room.stats[socketId]?.laddersClimbed ?? 0,
      roomId,
      gameMode: room.gameMode ?? "online",
    });
  }
}

/**
 * Called once per socket, right after it sends
 * socket.emit('join-games-server', { game: 'SnakeAndLadder', ... }).
 * Attaches every Snake & Ladder–specific listener to that socket.
 */
export default function SnakeAndLadder(io, socket, data) {
  console.log("SnakeAndLadder session start:", socket.id, data);

  socket.on("joinRoom", ({ roomId, dbId, ingameId }) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
        allPlayers: [],
        positions: {},
        turn: 0,
        started: false,
        winner: null,
        startedAt: null,
        gameMode: "online",
        playerMeta: {},
        stats: {},
      };
    }

    const room = rooms[roomId];

    if (!room.players.includes(socket.id)) {
      if (room.players.length >= 4) {
        socket.emit("roomFull");
        return;
      }
      room.players.push(socket.id);
      room.allPlayers.push(socket.id);
      room.positions[socket.id] = -1;
      room.playerMeta[socket.id] = { dbId: dbId ?? null, ingameId: ingameId ?? socket.id };
      room.stats[socket.id] = { snakesHit: 0, laddersClimbed: 0 };
    }

    io.to(roomId).emit("roomUpdate", {
      players: room.players,
      positions: room.positions,
      turn: room.players[room.turn],
      playerCount: room.players.length,
    });

    if (room.players.length === 2 && !room.started) {
      room.started = true;
      room.startedAt = Date.now();
      io.to(roomId).emit("gameStarted", {
        players: room.players,
        turn: room.players[room.turn],
      });
    }
  });

  socket.on("findMatch", ({ dbId, ingameId } = {}) => {
    if (waitingPlayers.length > 0) {
      const opponentId = waitingPlayers.shift();
      const opponentMeta = waitingMeta[opponentId] ?? { dbId: null, ingameId: opponentId };
      delete waitingMeta[opponentId];

      const roomId = `match_${Date.now()}`;

      rooms[roomId] = {
        players: [opponentId, socket.id],
        allPlayers: [opponentId, socket.id],
        positions: { [opponentId]: -1, [socket.id]: -1 },
        turn: 0,
        started: true,
        winner: null,
        startedAt: Date.now(),
        gameMode: "random",
        playerMeta: {
          [opponentId]: opponentMeta,
          [socket.id]: { dbId: dbId ?? null, ingameId: ingameId ?? socket.id },
        },
        stats: {
          [opponentId]: { snakesHit: 0, laddersClimbed: 0 },
          [socket.id]: { snakesHit: 0, laddersClimbed: 0 },
        },
      };

      const oppSocket = io.sockets.sockets.get(opponentId);
      if (oppSocket) oppSocket.join(roomId);
      socket.join(roomId);

      io.to(roomId).emit("matchFound", { roomId });
      io.to(roomId).emit("gameStarted", {
        players: rooms[roomId].players,
        turn: rooms[roomId].players[0],
      });
    } else {
      waitingMeta[socket.id] = { dbId: dbId ?? null, ingameId: ingameId ?? socket.id };
      waitingPlayers.push(socket.id);
      socket.emit("waitingForMatch");
    }
  });

  socket.on("cancelMatch", () => {
    const idx = waitingPlayers.indexOf(socket.id);
    if (idx !== -1) {
      waitingPlayers.splice(idx, 1);
      delete waitingMeta[socket.id];
    }
  });

  socket.on("rollDice", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room || room.winner) return;
    if (room.players[room.turn] !== socket.id) return;

    const dice = Math.floor(Math.random() * 6) + 1;
    let pos = room.positions[socket.id];

    if (pos === -1) {
      if (dice === 6) pos = 1;
    } else {
      pos += dice;
    }

    let snakeOrLadder = null;

    if (pos >= 1 && pos <= 100) {
      const result = applyRules(pos);
      if (result.kind) {
        snakeOrLadder = result.kind;
        if (result.kind === "snake") room.stats[socket.id].snakesHit++;
        if (result.kind === "ladder") room.stats[socket.id].laddersClimbed++;
      }
      pos = result.pos;
      room.positions[socket.id] = pos;
    } else if (pos > 100) {
      pos = room.positions[socket.id];
    }

    if (pos === 100) {
      room.winner = socket.id;
      io.to(roomId).emit("gameOver", { winner: socket.id });
      persistGameEnd(io, roomId, socket.id, "win").catch((err) =>
        console.error("DB save error (gameOver):", err)
      );
      return;
    }

    room.turn = (room.turn + 1) % room.players.length;

    io.to(roomId).emit("gameUpdate", {
      dice,
      positions: room.positions,
      turn: room.players[room.turn],
      rolledBy: socket.id,
      snakeOrLadder,
    });
  });

  socket.on("disconnect", () => {
    // Clean up matchmaking queue
    const qi = waitingPlayers.indexOf(socket.id);
    if (qi !== -1) {
      waitingPlayers.splice(qi, 1);
      delete waitingMeta[socket.id];
    }

    for (const [roomId, room] of Object.entries(rooms)) {
      const idx = room.players.indexOf(socket.id);
      if (idx === -1) continue;

      room.players.splice(idx, 1);
      delete room.positions[socket.id];

      if (room.players.length === 0) {
        delete rooms[roomId];
      } else {
        if (room.turn >= room.players.length) room.turn = 0;

        const remainingPlayer = room.players[0];

        io.to(roomId).emit("playerDisconnected", {
          playerId: socket.id,
          players: room.players,
          turn: room.players[room.turn],
        });

        if (room.started && !room.winner) {
          room.winner = remainingPlayer;
          persistGameEnd(io, roomId, remainingPlayer, "disconnected").catch((err) =>
            console.error("DB save error (disconnect):", err)
          );
        }
      }
    }
  });
}