const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const runSeq = require('run-sequence');

gulp.task('scripts:min', () => {
    return gulp.src('./components/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(rename({ suffix: '-min' }))
		.pipe(gulp.dest('./dist'));
});

gulp.task('scripts', () => {
	return gulp.src('./components/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('default', (cb) => {
	runSeq(['scripts', 'scripts:min'], cb)
});
