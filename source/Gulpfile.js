// General settings for GULP
var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

var reload = browserSync.reload;
var paths = {
    scss: './sass/*.scss'
};

// Get JS files and create a minified and unminified version
gulp.task('scripts', function() {
  return gulp.src(['js/*.js'])
    .pipe(sourcemaps.init())
   // .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify({outSourceMap:'../../js/main.min.js.map'}))
    .pipe(sourcemaps.write('./', {sourceRoot: '../components/source/js/'}))
    .pipe(gulp.dest('../../js'));
});

// Get SASS files, convert to CSS and create a minified and unminified version
gulp.task('sass', function () {
    return gulp.src([
        'scss/style.scss'
        ])
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});


gulp.task('compass', function() {
    return gulp.src([
        'scss/style.scss'
        ])
    .pipe(compass({
    config_file: 'scss/config.rb',
    sourcemap: true,
    debug : true,
    css: '../../css',
    sass: 'scss'
  }))
  .pipe(prefix())
  .pipe(minifycss())
  .pipe(gulp.dest('css'))
  .pipe(reload({stream:true}));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Browser-Sync task
gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        //server: { baseDir: "./" }
        // If you use vhosts use the line below and comment out the line above.
        proxy: "http://palazzo.dev"
    });
});

// Watch SCSS, js, tpl and html files, doing different things with each.
gulp.task('watch', ['compass', 'scripts', 'browser-sync'], function () { // replace 'sass' with 'compass'
    // Watch SCSS files and run compass if any SCSS files change.
    gulp.watch(["scss/**/*.scss"], ['compass']) //['sass'])

    // Watch the app.js file and run scripts when it changes, after that refresh browser to see updated JS.
    gulp.watch(["js/*.js"], ['scripts'])

    // Watch the *.* files in templates, chunks and snippets folders and run refresh browser to see updated Templates and Chunks.
    gulp.watch(["elements/templates/*.tpl", "elements/chunks/**/*.html", "elements/snippets/**/*.php", "elements/chunks/**/*.tpl"], ['bs-reload']);
});
