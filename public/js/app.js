/**
 * Tic Tac Toe Game
 * This script implements a simple Tic Tac Toe game with a scoring system.
 * It allows two players to play against each other, keeps track of scores,
 * and provides a reset functionality.
 */
class Game {
    constructor() {
        this.scoreDisplay1 = document.getElementById('score-x');
        this.scoreDisplay2 = document.getElementById('score-o');
        this.resetButton = document.getElementById('reset-button');
        this.gameBoard = document.getElementById('game-board');
        this.gameState = Array(9).fill("");

        this.scoreX = 0;
        this.scoreO = 0;
        this.gameEnd = false;
    }

    /**
     * Initializes the game by setting up event listeners
     * and resetting the game state.
     */
    start() {
        this.resetButton.addEventListener('click', () => this.#resetGame());
        for (let cel of this.gameBoard.getElementsByClassName('cell')) {
            cel.addEventListener('click', (event) => this.#handleCellClick(event, cel.id));
        }
        this.#resetGame();
    }

    /**
     * Resets the game state, clears the board,
     * and prepares for a new game.
     */
    #resetGame() {
        this.gameState.fill("");
        for (let img of this.gameBoard.getElementsByTagName('img')) {
            img.classList.remove('d-none');
            img.classList.add('d-preview');
        }
        for (let cell of this.gameBoard.getElementsByClassName('cell')) {
            cell.classList.remove('clicked');
        }
        this.gameBoard.classList.remove('current-player-x', 'current-player-o');
        this.gameBoard.classList.add(`current-player-${this.#getCurrentPlayer()}`);
        this.gameEnd = false;
    }

    /**
     * Determines the current player based on the game state.
     * @returns {string} Returns 'x' or 'o' depending on the current player.
     */
    #getCurrentPlayer() {
        return this.gameState.filter(x => x !== "").length % 2 === 0 ? 'x' : 'o';
    }

    /**
     * Handles the click event on a cell.
     * @param event The click event object.
     * @param cellId The ID of the clicked cell.
     */
    #handleCellClick(event, cellId) {
        const cellIndex = parseInt(cellId.substring(cellId.length - 1));

        if (this.gameEnd) return;
        if (this.gameState[cellIndex] !== "") return;

        const cell = document.getElementById(cellId);
        const currentPlayer = this.#getCurrentPlayer();

        cell.getElementsByClassName("mark-x")[0].classList.remove('d-preview');
        cell.getElementsByClassName("mark-o")[0].classList.remove('d-preview');
        if (currentPlayer === "x") {
            cell.getElementsByClassName("mark-o")[0].classList.add('d-none');
        } else {
            cell.getElementsByClassName("mark-x")[0].classList.add('d-none');
        }
        cell.classList.add('clicked');

        this.gameState[cellIndex] = currentPlayer;

        this.gameBoard.classList.remove('current-player-x', 'current-player-o');
        if (this.#hasWon(currentPlayer)) {
            this.gameEnd = true;
            this.#updateScore(currentPlayer);
            alert(`Player ${currentPlayer.toUpperCase()} wins!`);
            for (let cell of this.gameBoard.getElementsByClassName('cell')) {
                cell.classList.add('clicked');
            }
        } else {
            this.gameBoard.classList.add(`current-player-${currentPlayer === 'x' ? 'o' : 'x'}`);
        }
    }

    /**
     * Checks if the specified player has won the game.
     * @param player The player to check ('x' or 'o').
     * @returns {boolean} Returns true if the player has won, false otherwise.
     */
    #hasWon(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => this.gameState[index] === player)
        );
    }

    /**
     * Updates the score for the specified player.
     * @param player The player whose score is to be updated ('x' or 'o').
     */
    #updateScore(player) {
        if (player === 'x') {
            this.scoreX++;
            this.scoreDisplay1.textContent = this.scoreX;
        } else {
            this.scoreO++;
            this.scoreDisplay2.textContent = this.scoreO;
        }
    }
}

const game = new Game();
game.start();
