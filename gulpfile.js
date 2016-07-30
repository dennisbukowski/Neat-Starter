var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    path = require('gulp-path'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    minifyCss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Gulp Sass Task
gulp.task('sass', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('./css'))
    .pipe(notify({
        "title": " Terminal Notification",
        "subtitle": "Gulp Sass Task",
        "message": "Compiled file: <%= file.relative %>",
        "sound": false,
        "onLast": true,
        "wait": true
    }))
    /* Reload the browser CSS after every change */
    .pipe(reload({stream:true}));
});

/* Gulp Javscript Task */
gulp.task('js', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'bower_components/jquery/dist/jquery.min.js',
    'js/app.js'
    ])
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js/min'))

});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css', 'js/min/*.js'], {
        /* Already running server
        proxy: 'your_dev_site.dev'
        */
        /* For a static server you would use this: */
        server: {
            baseDir: './'
        }
    });
});

/* Reload task */
gulp.task('reload', function () {
    browserSync.reload();
});

// Create Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
gulp.task('default', ['sass', 'browser-sync'], function () {
  /* Watch scss, run the sass task on change. */
  gulp.watch('./scss/{,*/}*.{scss,sass}', ['sass'])
  /* Watch app.js file, run the scripts task on change. */
  gulp.watch(['js/app.js'], ['js'])
  /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(['*.html'], ['reload']);
});
