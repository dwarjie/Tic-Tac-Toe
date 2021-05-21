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

    // render the board and assign the value using _board array
    const renderBoard = () => {
        let index = 0; // board index
        _cell.forEach(elem => {
            elem.innerText = _board[index];
            index++;
        });
    };

    // assign a mark in the board
    const assignMark = (e, player) => {
        const target = e.target;
        // check if the cell is not occupied
        if (target.innerText == '') {
            if (player == 1) {
               _board[target.dataset.cell - 1] = "X";
            } else {
                _board[target.dataset.cell - 1] = "O";
            }
        } else {
            console.log('Already Marked');
        }
        renderBoard();
        console.log(_board);
        console.log(target.dataset.cell);
    };

    // bind event
    _cell.forEach(btn => {
        btn.addEventListener('click', (e) => assignMark(e, player = 1));
    });

    console.log(_board);
    return {
    	assign: assignMark,
    	render: renderBoard,
    };

})();

const RenderController = (() => {
    // menu elements
    const game = document.querySelector('#game');
    const menu = document.querySelector('#menu');
    const humanPlayer = document.querySelector('#human');
    const computer = document.querySelector('#computer');

    // bind events
    humanPlayer.addEventListener('click', () => {
        menu.style.display = 'none';
        game.style.display = 'flex'
    });
    computer.addEventListener('click', AIEnemy());
	/* TODO:
     * Render the Grid Board
     * Get all the UI elements
     * Handle all the events
     */
})();

const GameFlow = () => ({
    /* TODO:
     * Create the player (depends if p2 or ai are the enemy)
     * Render the Grid Board
     * Start the round 
     * Check if the player has already won
     * And if they want to play again or quit
     */
})();

const Player1 = Player('X', "Player1");