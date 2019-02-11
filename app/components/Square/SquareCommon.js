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