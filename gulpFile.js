const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const runSeq = require('run-sequence');

const surge = require('gulp-surge');

gulp.task('scripts:min', () => {
    return gulp.src('./components/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(rename({ suffix: '-min' }))
		.pipe(gulp.dest('./build'));
});

gulp.task('scripts', () => {
	return gulp.src('./components/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./build'));
});

gulp.task('surge', [], function () {
  return surge({
		project: './build',
		email: 'matt.claffey@codecomputerlove.com',
		domain: 'code-computerlove-fe-components.surge.sh',
		token: '0c8ff62cc885a267b038e5aa2a4d6020'
  });
});

gulp.task('copy:html', (cb) => {
	return gulp.src('./components/**/*.html')
	.pipe(replace(/http:\/\/localhost:8080/g, ''))
	.pipe(gulp.dest('./build'));
});

gulp.task('copy:css', (cb) => {
	return gulp.src('./components/**/*.css')
	.pipe(gulp.dest('./build'));
});

gulp.task('build', (cb) => {
	runSeq(['copy:html', 'copy:css', 'scripts', 'scripts:min'], ['surge'], cb);
});

gulp.task('default', (cb) => {
	runSeq(['scripts', 'scripts:min'], cb);
});


