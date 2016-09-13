var gulp = require('gulp');

var paths = {
  scripts: 'app/**/*.js',
};

gulp.task('copy', function() {
  gulp.src(paths.scripts).pipe(gulp.dest('build/js'))
});