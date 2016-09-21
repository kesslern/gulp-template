var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var inject      = require('gulp-inject');
var clean       = require('gulp-clean');
var series      = require('stream-series');
var debug       = require('gulp-debug');

gulp.task('serve', ['inject'], function () {

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch('./src/**/*.html', ['template', 'inject', 'reload']);
});

gulp.task('reload', function () {
    browserSync.reload()
});

gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});

/* Copy HTML to build*/
gulp.task('template', function () {

    return gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./build'));
});

/* Vendor CSS and Javascript */
gulp.task('vendor-resources', ['vendor-css', 'vendor-js'], function () {
    return true;
});

gulp.task('vendor-js', function () {
    return gulp.src(['./src/vendor/js/*.js'])
        .pipe(gulp.dest('./build/vendor/js'));
});

gulp.task('vendor-css', function () {
    return gulp.src(['./src/vendor/css/**/*.css'])
        .pipe(gulp.dest('./build/vendor/css'));
});

/* User CSS and JS into build directory  */
gulp.task('user-resources', ['user-css', 'user-js'], function () {
    return true;
});

gulp.task('user-js', function () {
    return gulp.src(['./src/js/**/*.js'])
        .pipe(gulp.dest('./build/js'));
});

gulp.task('user-css', function () {
    return gulp.src(['./src/css/**/*.css'])
        .pipe(gulp.dest('./build/css'));
});

/* Inject CSS and JS tags into index.html */
gulp.task('inject',
    ['vendor-resources', 'user-resources', 'template'],
    function () {

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
