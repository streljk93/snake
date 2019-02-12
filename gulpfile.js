const gulp = require('gulp');
const concat = require('gulp-concat');
const application = [

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

];

gulp.task('js', () => {
    return gulp.src(application)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app'));
});

gulp.task('build', function () {
    return gulp.src(application)
        .pipe(concat('snake.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', gulp.series('js', function () {

    gulp.watch(application, gulp.series('js'));

}));

gulp.task('default', gulp.series('watch'));