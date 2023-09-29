document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    const message = document.getElementById("message");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Handle cell click
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const cellIndex = cell.id;
            
            if (gameBoard[cellIndex] === "" && gameActive) {
                gameBoard[cellIndex] = currentPlayer;
                cell.innerText = currentPlayer;
                cell.style.color = currentPlayer === "X" ? "#007bff" : "#e91e63";
                
                if (checkWin()) {
                    gameActive = false;
                    message.innerText = `${currentPlayer} wins!`;
                } else if (isBoardFull()) {
                    gameActive = false;
                    message.innerText = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    // Check if there's a win
    function checkWin() {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    }

    // Check if the board is full (a draw)
    function isBoardFull() {
        return gameBoard.every(cell => cell !== "");
    }

    // Reset the game
    resetButton.addEventListener("click", () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.innerText = "";
            cell.style.color = "";
        });
        message.innerText = "";
        currentPlayer = "X";
        gameActive = true;
    });
});
