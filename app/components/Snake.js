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
        eat: eat,
        saveOldTail: saveOldTail,
        changePosition: changePosition,
    };
    
})();