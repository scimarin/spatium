var gulp = require('gulp');
var gls = require('gulp-live-server');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var browserify = require('browserify');
var watchify = require('watchify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var tsify = require('tsify');
var fancy_log = require('fancy-log');

var paths = {
    pages: ['src/*.html'],
    server: 'src/server.js'
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
        //.pipe(buffer())
        //.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
}

function makeServer() {
    gulp.src(paths.server)
        .pipe(gulp.dest('dist'));

    var server = gls.new('dist/server.js');

    return server.start();
}

exports.default = gulp.series(gulp.parallel(copyHtml), bundle, makeServer);

watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);
