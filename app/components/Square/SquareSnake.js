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

    // public methods
    SquareSnake.prototype = {
        constructor: SquareSnake,
    };

    // export
    snake.components.SquareSnake = SquareSnake;

})(snake.lib, snake.components.Square);
