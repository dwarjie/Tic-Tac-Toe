const CONSTANTS = (() => {
    const HUMANMODE = "Human"; // player vs player
    const COMPUTERMODE = "Computer" // player vs computer (AI)
    const DEFAULTBOARD = [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " ",
    ];

    return {
        HUMANMODE,
        COMPUTERMODE,
        DEFAULTBOARD,
    }

})();

const GameStatus = (() => {
    let _gameStatus = true; // if true show menu
    let _gameMode = "";
    let _roundNumber = 1;
    let _isWon = false;
    let _currentTurn = 1; // Player1 first
    let _totalTurn = 0; // how many turns already been

    const getStatus = () => { return _gameStatus };
    const getIsWon = () => { return _isWon };
    const getCurrentTurn = () => { return _currentTurn };
    const getMode = () => { return _gameMode };
    const getTotalTurn = () => { return _totalTurn };
    const getTotalRound = () => { return _roundNumber };

    const setStatus = (status) => { _gameStatus = status };
    const setIsWon = (isWon) => { _isWon = isWon };
    const setCurrentTurn = (currTurn) => { _currentTurn = currTurn };
    const setGameMode = (mode) => { _gameMode = mode };
    const setTotalTurn = (amount) => { _totalTurn = amount };
    const setRound = (round) => { _roundNumber = round };

    return {
        getStatus,
        getIsWon,
        getCurrentTurn,
        getMode,
        getTotalTurn,
        getTotalRound,
        setStatus,
        setIsWon,
        setCurrentTurn,
        setGameMode,
        setTotalTurn,
        setRound,
    };
})();

const Player = (side, name) => {
    let _score = 0;
    let _side = side;
    let _name = name;

    const addScore = () => _score++;
    const resetScore = () => _score = 0;

    const getScore = () => _score;
    const getSide = () => _side;
    const getName = () => _name;

    return { score: getScore, side: getSide, name: getName, resetScore, addScore, };
};

const Board = (() => {
    const constants = CONSTANTS;

    let _board = [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " ",
    ];

    // board elements
    const _cell = document.querySelectorAll('#item');

    const getBoard = () => {
        // get the value of board
        return _board;
    };

    const resetBoard = (confirm) => {
        // confirm if really want to reset
        if (confirm)
            _board.splice(0, _board.length, ...constants.DEFAULTBOARD);
    };

    // render the board and assign the value using _board array
    const renderBoard = () => {
        let index = 0; // board index
        _cell.forEach(elem => {
            elem.innerText = _board[index];
            index++;
        });
    };

    console.log(_board);
    return {
        getBoard,
        renderBoard,
        resetBoard,
    };

})();

const GameFlow = (() => {

    const horizontalPattern = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    const verticalPattern = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ];
    const diagonalPattern = [
        [1, 5, 9],
        [3, 5, 7]
    ];

    // later to be put value
    let player2;
    let player1;

    const board = Board;
    const gameBoard = board.getBoard();

    const gameStatus = GameStatus;
    let currentTurn = gameStatus.getCurrentTurn();
    const constants = CONSTANTS;

    const _checkPlayerName = (turn) => {
        if (gameStatus.getMode() === constants.HUMANMODE) {
            switch (turn) {
                case 1:
                    player1.addScore(); // add 1
                    return player1.name();
                    break;
                case 2:
                    player2.addScore();
                    return player2.name();
                default:
                    console.log("Can't Identify Player")
                    break;
            }
        } else {
            // computer
        }
    };

    const _checkWinner = () => {
        // the total game turns is 9
        // after 9 turn still no winner its draw
        let winPattern = [...horizontalPattern, ...verticalPattern, ...diagonalPattern];
        const side = currentTurn == 1 ? "X" : "O"

        // iterate into the array and
        // and check if the pattern has the same 3 value
        for (let i = 0; i <= winPattern.length - 1; i++) {
            let cell1 = gameBoard[winPattern[i][0] - 1];
            let cell2 = gameBoard[winPattern[i][1] - 1];
            let cell3 = gameBoard[winPattern[i][2] - 1];

            // check if all 3 cell has the same value
            // if true - current Turn wins else continue iteration
            if (cell1 == " " || cell2 == " " || cell3 == " ")
                continue;
            if (cell1 == cell2 && cell2 == cell3) {
                // gameStatus.setWinner(currentTurn);
                gameStatus.setIsWon(true);
                const render = RenderController;
                render.winnerScreen(`Winner: ${_checkPlayerName(currentTurn)}`, true);
            }
        };

        if (gameStatus.getTotalTurn() >= 9 && gameStatus.getIsWon() == false) {
            // it's a draw
            const render = RenderController;
            render.winnerScreen(`It's a draw!`, true);
        }
    };

    const _switchTurn = () => {
        console.log('Before switch: ' + currentTurn);
        currentTurn = currentTurn === 1 ? 2 : 1; // switch the side
        if (currentTurn === 1) {
            console.log(player1.name());
        } else {
            console.log(player2.name());
        };
    };

    // assign a mark in the board
    const _assignMark = (e) => {
        const target = e.target;
        // check if the cell is not occupied
        if (target.innerText == '') {
            if (currentTurn == 1) {
                gameBoard[target.dataset.cell - 1] = "X";
            } else {
                gameBoard[target.dataset.cell - 1] = "O";
            }
            gameStatus.setTotalTurn(gameStatus.getTotalTurn() + 1); // count the number of turn in game

            board.renderBoard();
            _checkWinner();
            _switchTurn();
        } else {
            // dont change turn
            console.log('Already Marked');
        }
    };

    const gameUI = () => {
        // Give the ui all information needs
        // update them in every round
        const render = RenderController;
        render.playInfo(gameStatus.getTotalRound(), player1.score(), player2.score(), player1.name(), player2.name());
    };

    const createEnemy = (mode) => {
        player1 = Player(1, "Player1"); // main player
        if (gameStatus.getMode() === constants.HUMANMODE) {
            player2 = Player(2, "Player2");
        } else {
            // create AI
        };
        gameUI()
    };

    // setting up for the next round
    const _resetRound = () => {
        board.resetBoard(true);
        board.renderBoard();
        gameStatus.setTotalTurn(0);
        gameStatus.setIsWon(false);
    };

    const playNextRound = () => {
        _resetRound();
        gameStatus.setRound(gameStatus.getTotalRound() + 1);
        console.log(`Round: ${gameStatus.getTotalRound()}`);
        _switchTurn();
        const render = RenderController;
        render.winnerScreen(false); // close modal
        gameUI();
    };

    const quitGame = () => {
        // reset everything
        _resetRound();
        gameStatus.setRound(1);
        gameStatus.setGameMode("");
        gameStatus.setStatus(true);
        player1.resetScore();
        player2.resetScore();
    };

    // board elements
    const _cell = document.querySelectorAll('#item');
    // board cells
    _cell.forEach(btn => {
        btn.addEventListener('click', (e) => _assignMark(e));
    });

    return {
        makeEnemy: createEnemy,
        nextRound: playNextRound,
        quitGame,
    };
    /* TODO:
     * Create the player (depends if p2 or ai are the enemy) /
     * Render the Grid Board /
     * Start the round /
     * Check if the player has already won /
     * And if they want to play again or quit
     */
})();

const RenderController = (() => {
    const _board = Board;
    const _gameFlow = GameFlow;
    const gameStatus = GameStatus;
    const constants = CONSTANTS;

    // menu elements
    const _game = document.querySelector('#game');
    const _menu = document.querySelector('#menu');
    const _humanPlayer = document.querySelector('#human');
    const _computer = document.querySelector('#computer');
    const _winnerModal = document.querySelector('#winnerModal');
    const _winnerName = document.querySelector('#winnerName');
    const _playAgainBtn = document.querySelector('#playMore');
    const _quitBtn = document.querySelector('#quit');
    const _round = document.querySelector('#round');
    const _player1Score = document.querySelector('#player1-score');
    const _enemyScore = document.querySelector('#enemy-score');

    const _toggleMenu = () => {
        // if status = true toggle to show menu
        if (gameStatus.getStatus()) {
            // show menu
            _menu.style.display = 'flex';
            _game.style.display = 'none';
        } else {
            // show game
            _menu.style.display = 'none';
            _game.style.display = 'flex';
        }
    };

    const _chooseEnemy = (e, choice) => {
        gameStatus.setStatus(false);
        _toggleMenu();
        const target = e.target;
        if (target.dataset.mode == "1") {
            gameStatus.setGameMode(constants.HUMANMODE);
        } else {
            gameStatus.setGameMode(constants.COMPUTERMODE);
        }
        _gameFlow.makeEnemy();
    };

    const winnerScreen = (winnerText = "", showModal) => {
        if (showModal == true) {
            // show modal
            _winnerName.innerText = winnerText;
            _winnerModal.style.display = 'block';
        } else {
            // remove modal
            _winnerName.innerText = '';
            _winnerModal.style.display = 'none';
        }
    };

    const playInfo = (round = 0, pScore = 0, eScore = 0, pName, eName) => {
        // game UI info
        _round.innerText = `Round: ${round}`;
        _player1Score.innerText = `${pName}: ${pScore}`;
        _enemyScore.innerText = `${eName}: ${eScore}`;
    };

    // bind events
    _humanPlayer.addEventListener('click', (e) => _chooseEnemy(e, 'player'));
    _computer.addEventListener('click', (e) => _chooseEnemy(e, 'computer'));
    _playAgainBtn.addEventListener('click', () => _gameFlow.nextRound());
    _quitBtn.addEventListener('click', () => {
        _gameFlow.quitGame();
        winnerScreen(false);
        _toggleMenu();
    });

    return {
        winnerScreen,
        playInfo,
    };
    /* TODO:
     * Render the Grid Board /
     * Get all the UI elements /
     * Handle all the events /
     */
})();