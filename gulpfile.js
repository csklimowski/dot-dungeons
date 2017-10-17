var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
 
gulp.task('build', function() {
	gulp.src('./src/**/*.js')
		.pipe(rollup({
	  		input: './src/game.js',
			format: 'iife',
			name: 'game'
		}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('bundle', function() {
	gulp.src('./src/**/*.js')
		.pipe(rollup({
	  		input: './src/game.js',
			format: 'iife',
			name: 'game'
		}))
		.pipe(gulp.dest('js'))
		.pipe(connect.reload());
});

gulp.task('serve', function() {
	connect.server({
		root: '.',
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(['./src/**'], ['build']);
})

gulp.task('develop', ['bundle', 'serve', 'watch']);