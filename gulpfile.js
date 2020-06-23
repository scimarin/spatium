var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var tsify = require('tsify');
var fancy_log = require('fancy-log');

var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(
    browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
}).plugin(tsify));

function copyHtml() {
    return gulp
        .src(paths.pages)
        .pipe(gulp.dest('dist'));
}

function bundle() {
    return watchedBrowserify
        .bundle()
        .on('error', fancy_log)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(gulp.parallel(copyHtml), bundle);

watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);
