'use strict';

var snake = snake || (function (Board) {

    // constant
    var LEFT = 37,
        RIGHT = 39,
        UP = 38,
        DOWN = 40;

    function run() {

    }

    function moveLeft() {
        Board.changeSnakePosition(-1, 0);
    }

    function moveRight() {
        Board.changeSnakePosition(1, 0);
    }

    function moveUp() {
        Board.changeSnakePosition(0, 1);
    }

    function moveDown() {
        Board.changeSnakePosition(0, -1);
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

})(snake.components.Board);

snake.run();