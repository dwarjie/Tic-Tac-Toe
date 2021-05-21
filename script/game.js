const Player = (side, name) => {
    let _score = 0;
    let _side = side;
    let _name = name;

    const _addScore = () => _score++;

    const getScore = () => _score;
    const getSide = () => _side;
    const getName = () => _name;

    return { getScore, getSide, getName };
};

const gameBoard = (() => {
    let _board = ['', '', '',
        '', '', '',
        '', '', '',
    ];

    // board elements
    const _cell = document.querySelectorAll('#item');

    // render the board and assign the value using _board array
    const _renderBoard = () => {
        let index = 0; // board index
        _cell.forEach(elem => {
            if (_board[index] == undefined) {
                elem.innerText = '';
            } else {
                elem.innerText = _board[index];
            }
            index++;
        });
    };

    const assignMark = (e, player) => {
        const target = e.target;
        if (player == 1) {
            _board[target.dataset.cell - 1] = "X";
        } else {
            _board[target.dataset.cell - 1] = "O";
        }
        console.log(_board);
        _renderBoard();
    };

    // bind event
    _cell.forEach(btn => {
        btn.addEventListener('click', (e) => assignMark(e, player = 1));
    });

    _renderBoard();

    return {
    	assignMark,
    };

})();

const Player1 = Player('X', "Player1");