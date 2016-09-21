var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var inject      = require('gulp-inject');
var clean       = require('gulp-clean');

gulp.task('serve', ['vendor', 'template', 'inject'], function () {

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
        .pipe(gulp.dest('./build/vendor/css'));

    gulp.src(['./src/vendor/js/*.js'])
        .pipe(gulp.dest('./build/vendor/js'));
});

gulp.task('inject', ['template', 'vendor'], function () {
    var target = gulp.src('./build/index.html');
    var vendorSources = gulp.src(
        ['./build/vendor/js/**/*.js', './build/vendor/css/**/*.css'],
        {read: false});

    return target.pipe(inject(vendorSources))
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});
