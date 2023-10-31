let board = document.getElementById('board');
let resetButton = document.getElementById('resetButton');
let playerXScoreElement = document.getElementById('playerXScore');
let playerOScoreElement = document.getElementById('playerOScore');
let choosePlayerSection = document.querySelector('.choosePlayer');
let gameSection = document.querySelector('.gameSection');

let currentPlayer = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;

function startGame(player) {
    currentPlayer = player;
    gameStarted = true;
    choosePlayerSection.style.display = 'none';
    gameSection.style.display = 'block';
}

function handleClick(index) {
    if (gameBoard[index] === '' && currentPlayer !== '' && gameStarted) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWin()) {
            setTimeout(() => {
                alert(`Player ${currentPlayer} wins!`);
                updateScore();
                resetBoard();
            }, 100);
        } else if (!gameBoard.includes('')) {
            setTimeout(() => {
                alert('It\'s a draw!');
                resetBoard();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function updateScore() {
    if (currentPlayer === 'X') {
        playerXScore++;
    } else {
        playerOScore++;
    }
    playerXScoreElement.textContent = `Player X: ${playerXScore}`;
    playerOScoreElement.textContent = `Player O: ${playerOScore}`;
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    renderBoard();
}

resetButton.addEventListener('click', () => {
    resetScores();
    resetBoard();
});

function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    playerXScoreElement.textContent = `Player X: ${playerXScore}`;
    playerOScoreElement.textContent = `Player O: ${playerOScore}`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleClick(index));
        board.appendChild(cellElement);
    });
}