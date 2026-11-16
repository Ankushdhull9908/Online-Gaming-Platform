
// ── CONFIG ───────────────────────────────────────────
import API from "../../API";
const SERVER = API
console.log('server',SERVER)
const DICE_EMOJI = { 1:'⚀', 2:'⚁', 3:'⚂', 4:'⚃', 5:'⚄', 6:'⚅' };
const MY_PIECE  = '🔴';
const OPP_PIECE = '🔵';

const RULES = {
  99:41, 89:53, 76:58, 54:31, 43:18, 40:3, 33:3, 27:5, 13:7,
  4:25, 9:31, 20:38, 28:84, 40:59, 51:67, 63:81, 71:91
};

// ── URL PARAMS ───────────────────────────────────────
const params    = new URLSearchParams(window.location.search);
const MODE      = params.get('mode');
const ROOM_ID   = params.get('id');
const MY_DB_ID  = params.get('dbId');
const MY_INGAME = params.get('ingameId') || 'Guest';

// ── STATE ────────────────────────────────────────────
let myId          = null;
let currentTurn   = null;
let positions     = {};
let playerMeta    = {};
let moveCount     = 0;
let snakesHit     = 0;
let laddersHit    = 0;
let currentRoomId = ROOM_ID;
let isRolling     = false;

// ── DOM ──────────────────────────────────────────────
const boardEl     = document.getElementById('board');
const diceEl      = document.getElementById('dice');
const diceHintEl  = document.getElementById('diceHint');
const turnNameEl  = document.getElementById('turnName');
const turnBarEl   = document.getElementById('turnBar');
const statusPill  = document.getElementById('statusPill');
const playersRow  = document.getElementById('playersRow');
const roomBadge   = document.getElementById('roomBadge');
const overlay     = document.getElementById('overlay');
const overlayIcon = document.getElementById('overlayIcon');
const overlayTitle= document.getElementById('overlayTitle');
const overlaySub  = document.getElementById('overlaySub');
const overlayBtn  = document.getElementById('overlayBtn');

// ── CELL SIZE (reads --cell CSS variable dynamically) ─
function getCellSize() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--cell').trim();
  // Could be "56px" or a calc() — parse float from resolved style
  const tmp = document.createElement('div');
  tmp.style.cssText = `position:absolute;width:${raw};visibility:hidden`;
  document.body.appendChild(tmp);
  const size = tmp.offsetWidth;
  document.body.removeChild(tmp);
  return size || 56;
}

// ── BUILD BOARD ──────────────────────────────────────
(function buildBoard() {
  for (let row = 9; row >= 0; row--) {
    const ltr = row % 2 === 0;
    for (let c = 1; c <= 10; c++) {
      const col  = ltr ? c : 11 - c;
      const pos  = row * 10 + col;
      const cell = document.createElement('div');
      cell.className  = 'cell';
      cell.dataset.pos = pos;
      boardEl.appendChild(cell);
    }
  }
})();

// ── PIECES ───────────────────────────────────────────
const pieceEls = {};

function getOrCreatePiece(pid) {
  if (!pieceEls[pid]) {
    const el = document.createElement('div');
    el.className  = 'player-piece';
    pieceEls[pid] = el;
  }
  // Update color every time — myId may not have been set when piece was first created
  pieceEls[pid].textContent = (pid === myId) ? MY_PIECE : OPP_PIECE;
  return pieceEls[pid];
}

function getCellEl(pos) {
  return boardEl.querySelector(`[data-pos="${pos}"]`);
}

function animatePieceTo(pid, newPos, kind) {
  if (newPos === -1) return;
  const piece = getOrCreatePiece(pid);
  if (piece.parentElement) piece.parentElement.removeChild(piece);
  const dest = getCellEl(newPos);
  if (!dest) return;
  dest.appendChild(piece);

  piece.classList.remove('jumping','snake-anim','ladder-anim');
  void piece.offsetWidth;
  if (kind === 'snake')  piece.classList.add('snake-anim');
  else if (kind === 'ladder') piece.classList.add('ladder-anim');
  else piece.classList.add('jumping');
  piece.addEventListener('animationend', () => {
    piece.classList.remove('jumping','snake-anim','ladder-anim');
  }, { once: true });
}

// ── PLAYER AVATARS ───────────────────────────────────
function renderAvatars() {
  playersRow.innerHTML = '';
  Object.entries(playerMeta).forEach(([pid, meta]) => {
    const isMe   = pid === myId;
    const pos    = positions[pid] ?? -1;
    const active = pid === currentTurn;
    const div    = document.createElement('div');
    div.className = `player-avatar ${isMe ? 'you' : 'opp'} ${active ? 'active-turn' : ''}`;
    div.id        = `av_${pid}`;
    div.innerHTML = `
      <div class="avatar-piece">${isMe ? MY_PIECE : OPP_PIECE}</div>
      <div class="avatar-info">
        <div class="avatar-name">${isMe ? (MY_INGAME || 'You') : (meta.ingameId || 'Opponent')}</div>
        <div class="avatar-pos">${pos === -1 ? '—' : pos} <small>/ 100</small></div>
      </div>`;
    playersRow.appendChild(div);
  });
}

function updateAvatarPos(pid, pos) {
  const el = document.getElementById(`av_${pid}`);
  if (el) {
    el.querySelector('.avatar-pos').innerHTML = `${pos === -1 ? '—' : pos} <small>/ 100</small>`;
  }
  document.querySelectorAll('.player-avatar').forEach(a => a.classList.remove('active-turn'));
  const active = document.getElementById(`av_${currentTurn}`);
  if (active) active.classList.add('active-turn');
}

// ── DICE UI ──────────────────────────────────────────
function setDiceCanRoll(can) {
  diceEl.classList.toggle('can-roll', can);
  diceHintEl.textContent = can ? 'TAP TO ROLL!' : 'Wait for your turn';
  diceHintEl.className   = 'dice-hint' + (can ? ' your-turn' : '');
}

function playDiceRoll(value) {
  diceEl.classList.add('rolling');
  let flickers = 0;
  const t = setInterval(() => {
    diceEl.textContent = DICE_EMOJI[Math.ceil(Math.random() * 6)];
    if (++flickers > 8) {
      clearInterval(t);
      diceEl.textContent = DICE_EMOJI[value] || value;
      diceEl.classList.remove('rolling');
    }
  }, 60);
}

// ── TURN UI ──────────────────────────────────────────
function updateTurnUI() {
  const myTurn = currentTurn === myId;
  turnNameEl.textContent = myTurn ? 'Your Turn! 🎯' : "Opponent's";
  turnNameEl.style.color = myTurn ? 'var(--yellow)' : 'var(--blue)';

  turnBarEl.style.animation = 'none';
  void turnBarEl.offsetWidth;
  turnBarEl.style.animation = '';

  setDiceCanRoll(myTurn);
  setStatus(
    myTurn ? 'your-turn' : 'their-turn',
    myTurn ? '🎯 Your turn — roll the dice!' : '⏳ Waiting for opponent...'
  );
}

function setStatus(cls, msg) {
  statusPill.className = `status-pill ${cls}`;
  statusPill.textContent = msg;
}

// ── OVERLAY ──────────────────────────────────────────
function showOverlay(icon, title, sub, showBtn = false) {
  overlayIcon.textContent  = icon;
  overlayTitle.textContent = title;
  overlaySub.textContent   = sub;
  overlayBtn.style.display = showBtn ? 'block' : 'none';
  overlay.classList.remove('hidden');
}
function hideOverlay() { overlay.classList.add('hidden'); }

// ── TOAST ────────────────────────────────────────────
function toast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className   = `toast ${type}`;
  t.textContent = msg;
  document.getElementById('toasts').appendChild(t);
  setTimeout(() => t.remove(), 2700);
}

// ── SOCKET ───────────────────────────────────────────
const socket = io(SERVER);

socket.on('connect', () => {
  myId = socket.id;
  playerMeta[myId] = { ingameId: MY_INGAME };
  positions[myId]  = -1;

  // Tell the shared platform server which game module to route this socket to
  socket.emit('join-games-server', { game: 'SnakeAndLadder' });

  if (MODE === 'online' && ROOM_ID) {
    roomBadge.textContent = `#${ROOM_ID}`;
    socket.emit('joinRoom', { roomId: ROOM_ID, dbId: MY_DB_ID, ingameId: MY_INGAME });
    showOverlay('⏳', 'Waiting...', 'Share your room code with a friend');
  } else if (MODE === 'random') {
    socket.emit('findMatch', { dbId: MY_DB_ID, ingameId: MY_INGAME });
    showOverlay('🔍', 'Finding Match', 'Looking for an opponent...');
  }
});

socket.on('matchFound', ({ roomId }) => {
  currentRoomId = roomId;
  roomBadge.textContent = `#${roomId}`;
});

socket.on('waitingForMatch', () => {
  showOverlay('🔍', 'Finding Match', 'Searching for an opponent...');
});

socket.on('roomUpdate', ({ players, positions: pos, turn, playerCount }) => {
  currentTurn = turn;
  positions   = pos;
  players.forEach((pid, i) => {
    if (!playerMeta[pid]) playerMeta[pid] = { ingameId: `Player ${i + 1}` };
  });
  renderAvatars();
  updateTurnUI();
  players.forEach(pid => {
    if (positions[pid] !== undefined && positions[pid] !== -1) {
      animatePieceTo(pid, positions[pid], 'jump');
    }
  });
  if (playerCount < 2) {
    showOverlay('⏳', 'Waiting...', `Room ${ROOM_ID || ''} — Share with a friend`);
  }
});

socket.on('gameStarted', ({ players, turn }) => {
  currentTurn = turn;
  players.forEach((pid, i) => {
    if (!playerMeta[pid]) playerMeta[pid] = { ingameId: `Player ${i + 1}` };
    positions[pid] = positions[pid] ?? -1;
  });
  hideOverlay();
  renderAvatars();
  updateTurnUI();
  toast('🎮 Game started! Good luck!', 'info');
});

socket.on('gameUpdate', ({ dice, positions: newPositions, turn, rolledBy, snakeOrLadder }) => {
  currentTurn = turn;
  const oldPos = positions[rolledBy] ?? -1;
  positions    = newPositions;
  const newPos = positions[rolledBy];

  playDiceRoll(dice);
  moveCount++;
  document.getElementById('movesVal').textContent = moveCount;

  let kind = 'jump';
  if (snakeOrLadder === 'snake') {
    kind = 'snake';
    if (rolledBy === myId) { snakesHit++; document.getElementById('snakesVal').textContent = `${snakesHit}🐍`; }
    setTimeout(() => {
      toast(rolledBy === myId ? `🐍 Snake! ${oldPos}→${newPos}` : '🐍 Opponent hit a snake!', 'snake');
      setStatus('snake-hit', `🐍 ${rolledBy === myId ? 'You hit' : 'Opponent hit'} a snake!`);
    }, 300);
  } else if (snakeOrLadder === 'ladder') {
    kind = 'ladder';
    if (rolledBy === myId) { laddersHit++; document.getElementById('laddersVal').textContent = `${laddersHit}🪜`; }
    setTimeout(() => {
      toast(rolledBy === myId ? `🪜 Ladder! ${oldPos}→${newPos}` : '🪜 Opponent climbed a ladder!', 'ladder');
      setStatus('ladder-up', `🪜 ${rolledBy === myId ? 'You climbed' : 'Opponent climbed'} a ladder!`);
    }, 300);
  }

  setTimeout(() => {
    animatePieceTo(rolledBy, newPos, kind);
    if (rolledBy === myId) {
      document.getElementById('myPosVal').textContent = newPos === -1 ? 'Need 6' : newPos;
    }
    updateAvatarPos(rolledBy, newPos);
    updateTurnUI();
  }, 400);
});

socket.on('gameOver', ({ winner }) => {
  const won = winner === myId;
  const pts  = Math.max(100, 500 + laddersHit * 50 - snakesHit * 30);
  setTimeout(() => {
    showOverlay(
      won ? '🏆' : '😔',
      won ? 'You Won!' : 'You Lost',
      won
        ? `Brilliant! ${moveCount} moves · +${pts} pts · 🪜×${laddersHit} 🐍×${snakesHit}`
        : `Better luck next time! 🐍×${snakesHit} 🪜×${laddersHit}`,
      true
    );
  }, 600);
});

socket.on('playerDisconnected', ({ playerId }) => {
  if (pieceEls[playerId]) { pieceEls[playerId].remove(); delete pieceEls[playerId]; }
  delete playerMeta[playerId];
  toast('⚠️ Opponent disconnected', 'info');
  showOverlay('🏆', 'Opponent Left', 'You win by default!', true);
});

socket.on('roomFull', () => {
  showOverlay('🚫', 'Room Full', 'This room already has players.');
  setTimeout(() => history.back(), 2500);
});

// ── ROLL DICE ────────────────────────────────────────
function rollDice() {
  if (myId !== currentTurn) { toast("⏳ It's not your turn!", 'info'); return; }
  if (isRolling) return;
  isRolling = true;
  setDiceCanRoll(false);
  const rid = currentRoomId || ROOM_ID;
  socket.emit('rollDice', { roomId: rid });
  setTimeout(() => { isRolling = false; }, 1200);
}