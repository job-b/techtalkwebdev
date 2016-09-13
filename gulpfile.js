var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
  scripts: 'app/**/*.js',
};

gulp.task('copy', function() {
  gulp.src(paths.scripts).pipe(gulp.dest('build/js'));
});

gulp.task('build', function() {
  gulp.src(paths.scripts)
  	.pipe(concat('all.min.js'))
  	.pipe(uglify())
  	.pipe(gulp.dest('build/js'));
});