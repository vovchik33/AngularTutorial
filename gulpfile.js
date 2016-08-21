"use-strict"

var gulp = require('gulp'),
	concatCSS=require('gulp-concat-css'),
	minifyCSS=require('gulp-minify-css'),
	notify=require('gulp-notify'),
	prefixer=require('gulp-autoprefixer'),
	livereload=require('gulp-livereload'),
	connect=require('gulp-connect'),
	rev_append=require('gulp-rev-append'),
	clean = require('gulp-clean'),
	renameCSS=require('gulp-rename');


gulp.task('cssbuild', function(){
	console.log("CSS BUILD");
	gulp.src('src/**/*.css')
		.pipe(concatCSS('bundle.css'))
		.pipe(prefixer('last 15 versions'))
		.pipe(minifyCSS(''))
		.pipe(renameCSS('bundle.min.css'))
		.pipe(gulp.dest('build/css/'))
		.pipe(notify('CSS REBUILT!!!'))
		.pipe(connect.reload());
});

gulp.task('htmlbuild', function(){
	console.log("HTML BUILD");
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('build/'))
		.pipe(notify('HTML REBUILT!!!'))
		.pipe(connect.reload());
});

gulp.task('rev_append', function() {
	gulp.src('./build/index.html')
		.pipe(rev_append())
		.pipe(gulp.dest('./build/'))
});

gulp.task('connect', function() {
	connect.server(
	{
		root:"build",
		livereload:true
	}
	)
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.css', ['cssbuild', 'rev_append'])
	gulp.watch('src/**/*.html', ['htmlbuild', 'rev_append'])
});

gulp.task('clean', function(){
	console.log("CLEAN BUILD DIRECTORY");
	gulp.src('./build', {read: false})
		.pipe(clean());
});

gulp.task('default', ['connect','htmlbuild','cssbuild','watch'])