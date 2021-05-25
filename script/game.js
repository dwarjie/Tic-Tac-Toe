const Player = (side, name) => {
    let _score = 0;
    let _side = side;
    let _name = name;

    const _addScore = () => _score++;

    const getScore = () => _score;
    const getSide = () => _side;
    const getName = () => _name;

    return { score: getScore, side: getSide, name: getName };
};

const Board = (() => {
    let _board = ['', '', '',
        '', '', '',
        '', '', '',
    ];

    // board elements
    const _cell = document.querySelectorAll('#item');

    const getBoard = () => {
        // get the value of board
        return _board;        
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
    };

})();

const GameFlow = (() => {
    
    const verticalPattern = []

    let player2;
    let currentTurn = 1; // player 1 first

    const board = Board;
    const gameBoard = board.getBoard();
    const player1 = Player(1, "Player1"); // main player

    const _checkWinner = () => {

    };

    const _switchTurn = () => {
        currentTurn = currentTurn === 1 ? 2 : 1; // switch the side
        if (currentTurn === 1) {
            console.log('Player1 Turn');
        } else {
            console.log('Player2 Turn');
        };
    };

    // assign a mark in the board
    const assignMark = (e) => {
        const target = e.target;
        // check if the cell is not occupied
        if (target.innerText == '') {
            if (currentTurn == 1) {
                gameBoard[target.dataset.cell - 1] = "X";
            } else {
                gameBoard[target.dataset.cell - 1] = "O";
            }
        } else {
            console.log('Already Marked');
        }
        board.renderBoard();
        _switchTurn();
    };

    const _createEnemy = (mode) => {
        if (mode === "Human") {
            player2 = Player(2, "Player2");
            console.log(player2);
            // create player 2
        } else {
            // create AI
        };
    };

    // board elements
    const _cell = document.querySelectorAll('#item');
    // board cells
    _cell.forEach(btn => {
        btn.addEventListener('click', (e) => assignMark(e));
    });

    return {
        makeEnemy: _createEnemy,
    };
    /* TODO:
     * Create the player (depends if p2 or ai are the enemy)
     * Render the Grid Board
     * Start the round 
     * Check if the player has already won
     * And if they want to play again or quit
     */
})();

const RenderController = (() => {
    let _gameMode = "";
    const _board = Board;
    const _gameFlow = GameFlow;
    // menu elements
    const _game = document.querySelector('#game');
    const _menu = document.querySelector('#menu');
    const _humanPlayer = document.querySelector('#human');
    const _computer = document.querySelector('#computer');

    const _toggleMenu = (status) => {
        // if status = true toggle to show menu
        if (status) {
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
        _toggleMenu(false);
        const target = e.target;
        if (target.dataset.mode == "1") {
            _gameMode = "Human";
        } else {
            _gameMode = "Computer";
        }
        _gameFlow.makeEnemy(_gameMode);
    };

    // bind events
    _humanPlayer.addEventListener('click', (e) => _chooseEnemy(e, 'player'));
    _computer.addEventListener('click', (e) => _chooseEnemy(e, 'computer'));
    /* TODO:
     * Render the Grid Board
     * Get all the UI elements
     * Handle all the events
     */
})();
