const board = document.getElementById("gameBoard");
const moveDisplay = document.getElementById("moveCount");
const matchDisplay = document.getElementById("matchCount");

const icons = ["🚀", "👾", "💎", "🎮", "🕹️", "⚔️", "🛡️", "🏆"];
let cards = [...icons, ...icons];
let flippedCards = [];
let moves = 0;
let matches = 0;
let isLockBoard = false; 

function initGame() {
  board.innerHTML = "";
  flippedCards = [];
  moves = 0;
  matches = 0;
  isLockBoard = false;
  moveDisplay.innerText = moves;
  matchDisplay.innerText = `0/${icons.length}`;

  cards.sort(() => Math.random() - 0.5);
  cards.forEach((icon, index) => {
    const col = document.createElement("div");
    col.className = "col-3 card-container";
    col.innerHTML = `
            <div class="card-inner" onclick="handleFlip(this, '${icon}')">
                <div class="card-front">?</div>
                <div class="card-back">${icon}</div>
            </div>
        `;
    board.appendChild(col);
  });
}

function handleFlip(cardInner, icon) {
  const cardContainer = cardInner.parentElement;
  if (
    isLockBoard ||
    cardContainer.classList.contains("flipped") ||
    flippedCards.includes(cardContainer)
  )
    return;

  cardContainer.classList.add("flipped");
  flippedCards.push({ element: cardContainer, icon });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  isLockBoard = true;
  moves++;
  moveDisplay.innerText = moves;

  const [card1, card2] = flippedCards;

  if (card1.icon === card2.icon) {
    matches++;
    matchDisplay.innerText = `${matches}/${icons.length}`;
    resetTurn(true);
  } else {
    card1.element.classList.add("shake");
    card2.element.classList.add("shake");

    setTimeout(() => {
      card1.element.classList.remove("flipped", "shake");
      card2.element.classList.remove("flipped", "shake");
      resetTurn(false);
    }, 1000);
  }
}

function resetTurn(isMatch) {
  flippedCards = [];
  isLockBoard = false;
  if (matches === icons.length) {
    setTimeout(() => alert(`Victory! Finished in ${moves} moves.`), 500);
  }
}

initGame();
