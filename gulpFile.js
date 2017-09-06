const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const path = require('path')
const runSeq = require('run-sequence');

gulp.task('copy:html', () => {
	return gulp.src('./components/**/*.html')
	.pipe(gulp.dest('./build'));
});

gulp.task('scripts', () => {
    return gulp.src('./components/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(replace(/module.exports[\s\S]*?;/g, ''))
		.pipe(gulp.dest('./build'));
});

gulp.task('default', (cb) => {
	runSeq(['scripts', 'copy:html'], cb)
});
