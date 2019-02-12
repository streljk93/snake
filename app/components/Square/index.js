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
