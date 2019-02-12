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
