// gulpfile.js
 
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var jasmine = require('gulp-jasmine');
var mocha = require("gulp-mocha");
var babel = require("gulp-babel");
var esdoc = require("gulp-esdoc");

 
gulp.task('build', function () {
  browserify({
    entries: 'index.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify, { "presets": ["es2015", "react"] })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
	console.log("test");
	return gulp.src(' tests/units/index.spec.js')
		.pipe(jasmine())
		.once("error", function(err) {
			console.log('error');
			console.log(err);
			process.exit(1);
		})
		.once("done", function() {
			console.log("done");
		});
});

gulp.task('compile', function() {
	return gulp.src(["./src/**/*.js"])
		.pipe(babel())
		.pipe(gulp.dest("./js"));
});

gulp.task('document', function() {
	return gulp.src("./src")
		.pipe(esdoc({ destination: "./docs" }));
});
 
gulp.task('default', ['build', 'document']);
