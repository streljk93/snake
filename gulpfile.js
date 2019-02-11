const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('js', () => {
    return gulp.src([

        // application
        'app/index.js',

        // config
        'app/config.js',

        // own libraries
        'app/lib/inherit.js',

        // components
        'app/components/Square/index.js',
        'app/components/Square/SquareCommon.js',
        'app/components/Square/SquareSnake.js',
        'app/components/Square/SquareApple.js',
        'app/components/Snake.js',
        'app/components/Board.js',
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app'));
});

gulp.task('default', gulp.series(['js']));