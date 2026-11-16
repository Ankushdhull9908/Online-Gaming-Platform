let squares = Array(9).fill(""); 
let isXTurn = true;
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Cols
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

const statusDisplay = document.getElementById("status");
const squareElements = document.querySelectorAll(".square");
const restartBtn = document.getElementById("restartBtn");

function getWinner() {
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function updateStatus() {
  const winner = getWinner();
  const isTie = !winner && squares.every((s) => s !== "");

  if (winner) {
    statusDisplay.innerText = `Winner is ${winner}. Please restart!`;
  } else if (isTie) {
    statusDisplay.innerText = "It's a Tie! Please restart!";
  } else {
    statusDisplay.innerText = `Next player is ${isXTurn ? "X" : "O"}`;
  }
}

function handleSquareClick(e) {
  const index = e.target.getAttribute("data-index");

  if (squares[index] !== "" || getWinner()) return;

  squares[index] = isXTurn ? "X" : "O";
  e.target.innerText = squares[index];
  e.target.classList.add("disabled");

  isXTurn = !isXTurn;
  updateStatus();
}

function restartGame() {
  squares = Array(9).fill("");
  isXTurn = true;
  statusDisplay.innerText = "Next player is X";
  squareElements.forEach((square) => {
    square.innerText = "";
    square.classList.remove("disabled");
  });
}

squareElements.forEach((square) =>
  square.addEventListener("click", handleSquareClick),
);
restartBtn.addEventListener("click", restartGame);
