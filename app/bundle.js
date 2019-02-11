'use strict';

var snake = snake || (function () {

    // constant
    var LEFT = 37,
        RIGHT = 39,
        UP = 38,
        DOWN = 40;

    function run() {
        snake.components.Board.initial();
    }

    function moveLeft() {
        snake.components.Board.autoChangeSnakePosition(-1, 0);
    }

    function moveRight() {
        snake.components.Board.autoChangeSnakePosition(1, 0);
    }

    function moveUp() {
        snake.components.Board.autoChangeSnakePosition(0, 1);
    }

    function moveDown() {
        snake.components.Board.autoChangeSnakePosition(0, -1);
    }

    function listenerMove() {
        document.addEventListener('keypress', function (e) {
            if (e.KeyCode === LEFT) {
                moveLeft();
            } else if (e.KeyCode === RIGHT) {
                moveRight();
            } else if (e.KeyCode === UP) {
                moveUp();
            } else if (e.KeyCode === DOWN) {
                moveDown();
            }
        });
    };

    listenerMove();

    return {
        run: run,
    };

})();

'use strict';

// main config of application
snake.config = snake.config || {

    application: {
        speed: 1000,
    },

    board: {
        size: 500,
        row: 10,
        cell: 10,
    },

    square: {
        size: 50,
    },

};
'use strict';

// lib inherit
snake.lib = snake.lib || {};
snake.lib.inherit = snake.lib.inherit || (function () {

    var F = function () {};

    return function inherit(Child, Parent) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.superClass = Parent.prototype;
        Child.prototype.constructor = Child;
    };

})();
'use strict';

snake.components = snake.components || {};

// Abstract Class (implementation)
(function (config) {

    // private params
    var Square;

    // constructor
    Square = function (x, y) {

        this._x = x;
        this._y = y;

    };

    // public methods
    Square.prototype = {
        constructor: snake.components.Square,

        makeNode: function () {
            var node = document.createElement('td');

            node.style.borderWidth = '1px';
            node.style.borderStyle = 'dashed';
            node.style.borderColor = 'black';
            node.style.width = config.square.size + 'px';
            node.style.height = config.square.size + 'px';
            node.style.background = this._color;
            node.style.padding = 0;
            node.style.margin = 0;

            return node;
        },

        setX: function (x) {
            this._x = x;
        },

        getX: function () {
            return this._x;
        },

        setY: function (y) {
            this._y = y;
        },

        getY: function () {
            return this._y;
        },
    };

    // export
    snake.components.Square = Square;

})(snake.config);

'use strict';

snake.components = snake.components || {};

(function (ownLib, Square) {

    var SquareCommon;

    // constructor
    SquareCommon = function (x, y) {

        // extend params Parent
        Square.call(this, x, y);

        this._color = 'white';

    };
    ownLib.inherit(SquareCommon, Square);

    // export
    snake.components.SquareCommon = SquareCommon;

})(snake.lib, snake.components.Square);
'use strict';

snake.components = snake.components || {};

(function (ownLib, Square) {

    var SquareSnake;

    // constructor
    SquareSnake = function (x, y) {

        // extend params Parent
        Square.call(this, x, y);

        this._color = 'black';

    };
    ownLib.inherit(SquareSnake, Square);

    // export
    snake.components.SquareSnake = SquareSnake;

})(snake.lib, snake.components.Square);

'use strict';

snake.components = snake.components || {};

(function (ownLib, Square) {

    var SquareApple;

    // constructor
    SquareApple = function (x, y) {

        // extend params Parent
        Square.call(this, x, y);

        this._color = 'white';

    };
    ownLib.inherit(SquareApple, Square);

    // export
    snake.components.SquareApple = SquareApple;

})(snake.lib, snake.components.Square);
'use strict';

snake.components = snake.components || {};
snake.components.Snake = snake.components.Snake || (function () {

    // [{x: 6, y: 7}, {x: 5, y: 7}, {x: 4, y: 7}]; // example snake
    // [square, square, square]
    var squares = [],
        oldTail;

    function initial(square) {
        squares.push(square);
    }

    function getSquare(x, y) {
        var length = squares.length,
            row,
            square;

        for (row = 0; row < length; row++) {
            square = squares[row];

            if (square.getX() === x && square.getY() === y) {
                return square;
            }
        }

        return null;
    }

    function getTail() {
        return squares[squares.length - 1];
    }

    function saveOldTail() {
        oldTail = getTail();
    }

    function eat() {
        squares.push(oldTail);
    }

    function changePosition(x, y, depth) {
        var depth = depth || 0;
        var square = squares[depth];
        var current = { x: square.getX(), y: square.getY() };

        square.setX(x);
        square.setY(y);

        if (squares[depth + 1]) changePosition(current.x, current.y, depth + 1);
    }
    
    return {
        initial: initial,
        getSquare: getSquare,
        eat: eat,
        saveOldTail: saveOldTail,
        changePosition: changePosition,
    };
    
})();
'use strict';

// component Board
snake.components = snake.components || {};
snake.components.Board = snake.components.Board
    || (function (config, SquareCommon, SquareSnake, SquareApple, Snake) {

    var squares = [];

    function initial() {
        var row,
            cell,
            squareSnake;

        for (row = 0; row < config.board.row; row++) {
            squares[row] = [];
            for (cell = 0; cell < config.board.cell; cell++) {
                squares[row][cell] = new SquareCommon(cell, row);
                if (cell === (config.board.cell / 2)) {
                    if (row === (config.board.row / 2)) {
                        squareSnake = new SquareSnake(cell, row);
                        squares[row][cell] = squareSnake;
                        Snake.initial(squareSnake);
                    }
                }
            }
        }

        autoChangeSnakePosition(-1, 0);
    }

    /**
     * Change position of snake on the board to left side
     * @param {number} x
     * @param {number} y
     */
    function changeSnakePosition(x, y) {
        Snake.changePosition(x, y);

        draw();
    }

    function autoChangeSnakePosition(x, y) {
        setInterval(function () {
            changeSnakePosition(x, y);
        }, config.application.speed);
    }

    function makeNodeBoard() {
        var node = document.createElement('table');
        node.style.borderCollapse = 'colapse';
        node.style.borderWidth = '1px';
        node.style.borderStyle = 'solid';
        node.style.borderColor = 'black';
        node.style.width = config.board.size + 'px';
        node.style.height = config.board.size + 'px';

        return node;
    }

    function makeNodeRow() {
        var node = document.createElement('tr');

        return node;
    }

    function draw() {
        var boardNode = makeNodeBoard(),
            size = squares.length,
            square,
            squareCommon,
            squareSnake,
            rowNode,
            cellNode,
            row,
            cell;

        for (row = 0; row < size; row++) {
            rowNode = makeNodeRow();
            for (cell = 0; cell < size; cell++) {

                // get squares
                squareSnake = Snake.getSquare(cell, row);
                squareCommon = squares[row][cell];

                // check that mount
                if (squareSnake) {
                    square = squareSnake;
                } else {
                    square = squareCommon;
                }

                // mount
                cellNode = square.makeNode();
                rowNode.append(cellNode);
            }
            boardNode.append(rowNode);
        }

        document.querySelector('#js-snake').innerHTML = '';
        document.querySelector('#js-snake').append(boardNode);
    }

    return {
        initial: initial,
        autoChangeSnakePosition: autoChangeSnakePosition,
    };

})(
    snake.config,
    snake.components.SquareCommon,
    snake.components.SquareSnake,
    snake.components.SquareApple,
    snake.components.Snake
);