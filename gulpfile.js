var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css');

// Gulp Sass Task
gulp.task('sass', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('./css'))
    .pipe(notify({
        "title": " Terminal Notification",
        "subtitle": "Gulp Sass Task",
        "message": "Compiled file: <%= file.relative %>",
        "sound": false,
        "onLast": true,
        "wait": true
    }));
});

/* Gulp Javscript Task */
gulp.task('js', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'js/app.js'
    ])
    //.pipe(concat('all.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js/min'))
    .pipe(notify({
        "title": " Terminal Notification",
        "subtitle": "Gulp Javscript Task",
        "message": "Minified file: <%= file.relative %>",
        "sound": false,
        "onLast": true,
        "wait": true
    }));
});

// Create Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
gulp.task('default', ['sass'], function () {
  /* Watch scss, run the sass task on change. */
  gulp.watch('./scss/{,*/}*.{scss,sass}', ['sass'])
  /* Watch app.js file, run the scripts task on change. */
  gulp.watch(['js/app.js'], ['js'])
});
