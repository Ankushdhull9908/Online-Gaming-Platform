import { Server } from "socket.io";

import Ludo from "../games/Ludo.js";

/**
 * Boots the shared socket.io server and routes each connection to the
 * correct per-game module based on the 'join-games-server' handshake.
 *
 * Adding a new game later = add one case here + one file in /games.
 */
export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join-games-server", (data = {}) => {
      switch (data.game) {
        case "SnakeAndLadder":
          SnakeAndLadder(io, socket, data);
          break;

        case "Ludo":
          Ludo(io, socket, data);
          break;

        default:
          console.warn(`Unknown game requested by ${socket.id}:`, data.game);
      }
    });

    
    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
      // Per-game cleanup (rooms, matchmaking queues, DB persistence)
      // lives inside each game module's own 'disconnect' handler.
    });
  });

  return io;
}