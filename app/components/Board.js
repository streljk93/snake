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