var gulp = require('gulp')
var uglify = require('gulp-uglify');
var babel = require('gulp-babel')
var  rename = require ('gulp-rename');

/* gulp.task('default', done => {
    gulp.src('./prettyLog.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
     done();
}) */

/* ES6 -> ES5  */

gulp.task('transform', function() {
    return gulp.src('prettyLog.js')
         .pipe(babel())
         .pipe(rename(
            'prettyLog.js'
         ))
         .pipe(gulp.dest('dist'));
 });


gulp.task('default',['transform'], function() {
   return gulp.src('dist/prettyLog.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/min'));
});