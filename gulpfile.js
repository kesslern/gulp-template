var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var inject      = require('gulp-inject');

gulp.task('serve', ['vendor', 'template'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch("./app/**/*.html").on("change", browserSync.reload);
});

gulp.task('template', function () {

    gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./build'));
});

gulp.task('vendor', function () {

    gulp.src(['./src/vendor/css/*.css'])
        .pipe(gulp.dest('./build/css'));

    gulp.src(['./src/vendor/js/*.js'])
        .pipe(gulp.dest('./build/js'));
});