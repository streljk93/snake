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