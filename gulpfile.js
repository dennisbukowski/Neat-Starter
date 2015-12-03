var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css');

// Gulp Sass Task
gulp.task('sass', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
})

// Create Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
gulp.task('default', ['sass'], function () {
  gulp.watch('./scss/{,*/}*.{scss,sass}', ['sass'])
});
