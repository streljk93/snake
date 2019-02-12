'use strict';

var snake = snake || (function () {

    // constant
    var LEFT = 'KeyA',
        RIGHT = 'KeyD',
        UP = 'KeyW',
        DOWN = 'KeyS',
        beforeMove = {};

    function run() {
        snake.components.Board.initial();
    }

    function move(x, y) {
        var Board = snake.components.Board;
        Board.autoChangeSnakePosition(x, y, beforeMove);
        beforeMove.x = x;
        beforeMove.y = y;
    }

    function listenerMove() {
        document.addEventListener('keypress', function (e) {
            if (e.code === LEFT) {
                move(-1, 0);
            } else if (e.code === RIGHT) {
                move(1, 0);
            } else if (e.code === UP) {
                move(0, -1);
            } else if (e.code === DOWN) {
                move(0, 1);
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
        speed: 160,
    },

    board: {
        size: 500,
        row: 25,
        cell: 25,
    },

    square: {
        size: 20,
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

            node.style.borderWidth = '0px';
            node.style.borderStyle = 'solid';
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

        this._color = 'red';

    };
    ownLib.inherit(SquareApple, Square);

    // export
    snake.components.SquareApple = SquareApple;

})(snake.lib, snake.components.Square);
'use strict';

snake.components = snake.components || {};
snake.components.Snake = snake.components.Snake || (function (SquareSnake) {

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

    function getSquares() {
        return squares;
    }

    function getTail() {
        return squares[squares.length - 1];
    }

    function getHead() {
        return squares[0];
    }

    function saveOldTail() {
        oldTail = getTail();
    }

    function eat() {
        var square = new SquareSnake();

        square.setX(oldTail.getX());
        square.setY(oldTail.getY());

        squares.push(square);
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
        getSquares: getSquares,
        getHead: getHead,
        getSquare: getSquare,
        eat: eat,
        saveOldTail: saveOldTail,
        changePosition: changePosition,
    };
    
})(snake.components.SquareSnake);
'use strict';

// component Board
snake.components = snake.components || {};
snake.components.Board = snake.components.Board
    || (function (config, SquareCommon, SquareSnake, SquareApple, Snake) {

    var squares = [],
        count = 0,
        apple,
        interval;

    function initial() {
        var row,
            cell;

        for (row = 0; row < config.board.row; row++) {
            squares[row] = [];
            for (cell = 0; cell < config.board.cell; cell++) {

                // common square initial
                squares[row][cell] = new SquareCommon(cell, row);

                // apple initial
                if (row === 2 && cell === 2) {
                    apple = new SquareApple(cell, row);
                    squares[row][cell] = apple;
                }

                // snake initial
                if (cell === Math.round(config.board.cell / 2)) {
                    if (row === Math.round(config.board.row / 2)) {
                        Snake.initial(new SquareSnake(cell, row));
                    }
                }
            }
        }

        draw();
    }

    function getSquare(x, y) {
        var length = squares.length,
            row,
            cell,
            square;

        for (row = 0; row < length; row++) {
            for (cell = 0; cell < length; cell++) {
                square = squares[row][cell];
                if (square.getX() === x && square.getY() === y) {
                    return square;
                }
            }
        }

        return null;
    }

    /**
     * Change position of snake on the board
     * @param {number} x
     * @param {number} y
     */
    function changeSnakePosition(x, y) {
        var square = getSquare(x, y),
            squaresSnake = Snake.getSquares(),
            squaresSnakeLength = squaresSnake.length,
            headSnake,
            headSnakeX,
            headSnakeY,
            squareSnake,
            i;

        Snake.saveOldTail();

        Snake.changePosition(x, y);

        // eat apple
        if (square instanceof SquareApple) {
            Snake.eat();
            removeApple();
            addApple();
            count++;
        }

        // eat own body
        headSnake = Snake.getHead();
        headSnakeX = headSnake.getX();
        headSnakeY = headSnake.getY();
        for (i = 1; i < squaresSnakeLength; i++) {
            squareSnake = squaresSnake[i];
            if (headSnakeX === squareSnake.getX() && headSnakeY === squareSnake.getY()) {
                location.href = '';
            }
        }

        // out board by x
        if (headSnakeX < 0 || headSnakeX > (config.board.cell - 1)) {
            location.href = '';
        }

        // out board by y
        if (headSnakeY < 0 || headSnakeY > (config.board.row - 1)) {
            location.href = '';
        }

        draw();
    }

    function autoChangeSnakePosition(x, y, beforeMove) {
        var head = Snake.getHead();

        if (beforeMove.x !== x && beforeMove.y !== y) {
            changeSnakePosition(head.getX() + x, head.getY() + y);

            clearInterval(interval);

            interval = setInterval(function () {
                changeSnakePosition(head.getX() + x, head.getY() + y);
            }, config.application.speed);
        }


    }

    function makeNodeBoard() {
        var node = document.createElement('table');
        node.style.borderCollapse = 'collapse';
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
            rootNode = document.querySelector('#js-snake'),
            size = squares.length,
            scoreNode = document.createTextNode('SCORE = ' + count),
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

        rootNode.innerHTML = '';
        rootNode.append(boardNode);
        rootNode.append(scoreNode);
    }

    function removeApple() {
        var x = apple.getX(),
            y = apple.getY();

        squares[y][x] = new SquareCommon(x, y);
    }

    function addApple() {
        var x = Math.floor(Math.random() * config.board.cell),
            y = Math.floor(Math.random() * config.board.row);

        apple = new SquareApple(x, y);
        squares[y][x] = apple;
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