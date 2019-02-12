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