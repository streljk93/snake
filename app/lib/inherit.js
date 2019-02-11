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