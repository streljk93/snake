'use strict';

var snake = snake || (function () {

    // constant
    var LEFT = 37,
        RIGHT = 39,
        UP = 38,
        DOWN = 40;

    function run() {
        snake.components.Board.initial();
    }

    function moveLeft() {
        snake.components.Board.autoChangeSnakePosition(-1, 0);
    }

    function moveRight() {
        snake.components.Board.autoChangeSnakePosition(1, 0);
    }

    function moveUp() {
        snake.components.Board.autoChangeSnakePosition(0, 1);
    }

    function moveDown() {
        snake.components.Board.autoChangeSnakePosition(0, -1);
    }

    function listenerMove() {
        document.addEventListener('keypress', function (e) {
            if (e.KeyCode === LEFT) {
                moveLeft();
            } else if (e.KeyCode === RIGHT) {
                moveRight();
            } else if (e.KeyCode === UP) {
                moveUp();
            } else if (e.KeyCode === DOWN) {
                moveDown();
            }
        });
    };

    listenerMove();

    return {
        run: run,
    };

})();
