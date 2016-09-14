var gulp = require('gulp');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-clean-css');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect')
var eslint = require('gulp-eslint');
var Server = require('karma').Server;


gulp.task('test', function(done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
  	done();
  }).start();
});

gulp.task('autotest', function() {
  return gulp.watch(['www/js/**/*.js', 'test/spec/*.js'], ['test']);
});

var paths = {
  html: ['app/**/*.html'],
  json: ['app/**/*.json'],
  images: ['app/**/*.jpg'],
  js: ['app/**/*.js']
};

gulp.task('copyJSON', function() {
  gulp.src(paths.json).pipe(gulp.dest('build'));
});

gulp.task('copyImages', function() {
  gulp.src(paths.images).pipe(gulp.dest('build'));
});

gulp.task('copyHtml', function() {
  gulp.src(paths.html).pipe(gulp.dest('build'));
});

gulp.task('build', ['copyHtml', 'copyJSON', 'copyImages'], function() {
  gulp.src('app/index.html')
  	.pipe(useref())
  	.pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
  	.pipe(gulp.dest('build'));
});

gulp.task('ESLint', function() {
  gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  connect.server({
	livereload: true
  });
  gulp.watch(paths.js, ['ESLint']);
  gulp.watch(paths.js, ['test']);
});