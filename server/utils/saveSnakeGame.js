// ⚠️  Import path must EXACTLY match your filename capitalisation
//import Player from "../schemas/PlayerShema.js";
//import { SnakeAndLadderGame, SnakeAndLadderStats } from "../schemas/SnakeAndLadder.js";

// ── Level helpers ─────────────────────────────────────
function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}
function computeLevel(totalXp) {
  let level = 1;
  while (xpForLevel(level + 1) <= totalXp) level++;
  return level;
}

// ── Points ────────────────────────────────────────────
function computePoints({ result, totalMoves, laddersClimbed, snakesHit, durationSec }) {
  if (result === "disconnected") return 0;
  if (result === "loss") return Math.max(10, laddersClimbed * 20); // consolation

  // Winner
  let pts = 500;
  pts += laddersClimbed * 50;
  pts -= snakesHit * 30;
  pts += Math.max(0, 200 - totalMoves * 2);                        // efficiency
  if (durationSec > 0 && durationSec < 180) pts += 100;            // speed bonus
  return Math.max(50, pts);
}

// ── Main export ───────────────────────────────────────
export async function saveGame({
  playerId, ingameId, opponent, result,
  durationSec = 0, snakesHit = 0, laddersClimbed = 0,
  totalMoves = 0, roomId, gameMode = "online"
}) {
  try {
    if (!playerId || playerId === "null" || playerId === "undefined") {
      console.log(`[DB] Skipping ${ingameId} — no valid playerId (guest)`);
      return { pointsEarned: 0 };
    }

    const pointsEarned = computePoints({ result, totalMoves, laddersClimbed, snakesHit, durationSec });

    // Sanitise opponent ID
    const cleanOpponent = {
      playerId: (opponent?.playerId && opponent.playerId !== "null" && opponent.playerId !== "undefined")
        ? opponent.playerId : null,
      ingameId: opponent?.ingameId || "Unknown",
      isGuest:  !opponent?.playerId || opponent.playerId === "null"
    };

    // 1) Save game record
    await SnakeAndLadderGame.create({
      player: playerId,
      opponent: cleanOpponent,
      result,
      pointsEarned,
      durationSec,
      snakesHit,
      laddersClimbed,
      totalMoves,
      roomId,
      gameMode
    });

    // 2) Upsert stats
    let stats = await SnakeAndLadderStats.findOne({ player: playerId });
    if (!stats) stats = new SnakeAndLadderStats({ player: playerId });

    stats.totalGames   += 1;
    stats.totalPoints  += pointsEarned;
    stats.totalMoves   += totalMoves;
    stats.totalLadders += laddersClimbed;
    stats.totalSnakes  += snakesHit;
    stats.lastPlayedAt  = new Date();
    if (pointsEarned > stats.bestScore) stats.bestScore = pointsEarned;

    if (result === "win") {
      stats.wins++;
      stats.currentStreak++;
      if (stats.currentStreak > stats.bestStreak) stats.bestStreak = stats.currentStreak;
    } else if (result === "loss") {
      stats.losses++;
      stats.currentStreak = 0;
    }

    // Compute winRate manually (removed pre-save hook — it crashed with "next is not a function")
    stats.winRate = stats.totalGames > 0
      ? Math.round((stats.wins / stats.totalGames) * 100)
      : 0;

    await stats.save();

    // 3) XP + coins + level-up on Player document
    const xpGained    = Math.max(1, Math.floor(pointsEarned / 10));
    const coinsGained = pointsEarned;

    const player = await Player.findById(playerId);
    let levelUp = false, newLevel = 1;

    if (player) {
      const oldLevel = player.level || 1;
      const newXp    = (player.xp || 0) + xpGained;
      newLevel       = computeLevel(newXp);
      levelUp        = newLevel > oldLevel;

      await Player.findByIdAndUpdate(playerId, {
        $inc: { coins: coinsGained },
        $set: { xp: newXp, level: newLevel }
      });
    }

    console.log(`[DB] SUCCESS: ${ingameId} | ${result} | +${pointsEarned}pts | xp+${xpGained}${levelUp ? ` | LEVEL UP to ${newLevel}` : ''}`);
    return { pointsEarned, xpGained, coinsGained, levelUp, newLevel };

  } catch (err) {
    console.error(`[DB] FAILED saveGame for ${ingameId}:`, err.message);
    throw err;
  }
}
