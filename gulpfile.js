var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var inject      = require('gulp-inject');
var clean       = require('gulp-clean');
var series      = require('stream-series');
var sass        = require('gulp-sass');
var debug       = require('gulp-debug');
var cleanDone   = false;

gulp.task('serve', ['inject'], function () {

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch('./src/**/*.html', ['inject', 'reload']);
    gulp.watch('./src/scss/**/*.scss', ['user-scss']);
    gulp.watch('./src/js/**/*.js', ['inject', 'reload']);
});

gulp.task('default', ['serve']);

gulp.task('reload', function () {
    browserSync.reload()
});

gulp.task('clean', function () {

    if (!cleanDone) {
        return gulp.src('./build', {read: false})
            .pipe(clean())
            .on('end', function () {
                cleanDone = true;
            });
    }
});

/* Copy HTML to build*/
gulp.task('template', ['clean'], function () {

    return gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./build'));
});

/* Vendor CSS, Javascript, and fonts */
gulp.task('vendor-resources', ['vendor-css', 'vendor-js', 'vendor-fonts'], function () {});

gulp.task('vendor-js', ['clean'], function () {
    return gulp.src(['./src/vendor/js/*.js'])
        .pipe(gulp.dest('./build/vendor/js'));
});

gulp.task('vendor-css', ['clean'], function () {
    return gulp.src(['./src/vendor/css/**/*.css'])
        .pipe(gulp.dest('./build/vendor/css'));
});

gulp.task('vendor-fonts', ['clean'], function () {
    return gulp.src(['./src/vendor/fonts/**'])
        .pipe(gulp.dest('./build/vendor/fonts'));
});

/* User SCSS and JS into build directory  */
gulp.task('user-resources', ['user-scss', 'user-js'], function () {});

gulp.task('user-js', ['clean'], function () {
    return gulp.src(['./src/js/**/*.js'])
        .pipe(gulp.dest('./build/js'));
});

gulp.task('user-scss', ['clean'], function () {
    return gulp.src(['./src/scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

/* Inject CSS and JS tags into index.html */
gulp.task('inject', ['vendor-resources', 'user-resources', 'template'], function () {

        var vendorSources = gulp.src(
            ['./build/vendor/js/**/*.js', './build/vendor/css/**/*.css'],
            {read: false});
        var userSources = gulp.src (
            ['./build/js/**/*.js', './build/css/**/*.css'],
            {read: false});

        return gulp.src('./build/index.html')
            .pipe(inject(series(vendorSources, userSources), {relative: true}))
            .pipe(gulp.dest('./build'));
    });
