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