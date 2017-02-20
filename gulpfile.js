/**
 * Created by Justin on 2/17/2017.
 */
'use strict';

const gulp = require('gulp'),
			concat = require('gulp-concat'),
			uglify = require('gulp-uglify'),
			rename = require('gulp-rename'),
			sass = require('gulp-sass'),
			maps = require('gulp-sourcemaps'),
			del = require('del'),
			useref = require('gulp-useref'),
			iff = require('gulp-if'),         //Implement this
			csso = require('gulp-csso');     //implement this


var options = {
	src: 'src',
	dist: 'dist'
};

//gulp.task('concatScripts', function(){
//		return gulp.src([
//			options.src + '/js/jquery-3.1.1.js',
//			options.src + '/js/circle/autogrow.js',
//			options.src + '/js/circle/circle.js'])
//			.pipe(maps.init())
//			.pipe(concat("app.js"))
//			.pipe(maps.write('./'))
//			.pipe(gulp.dest(options.src + '/scripts'));
//});




gulp.task('concatScripts', function(){
	return gulp.src([
			//options.src + '/js/jquery-3.1.1.js',
			options.src + '/js/circle/autogrow.js',
			options.src + '/js/circle/circle.js'])
		.pipe(maps.init())
		.pipe(concat("app.js"))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.src + '/scripts'));
});



gulp.task('minifyScripts', ["concatScripts"], function(){
	return gulp.src(options.src +"/scripts/app.js")
		.pipe(maps.init())
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.src + '/scripts'));
});

gulp.task('clean', function(){
	del(['dist', 'css/global.css*', 'scripts/app*.js*']);
});
gulp.task('cleanSrc', function(){
	del(['src/css/global.css*', 'src/scripts/app*.js*', 'src/scripts']);
});

gulp.task('buildSrc', ['concatScripts', 'compileSass']);



/*
The task process to compile sass into css.
 */
gulp.task('compileSass', function(){
	return gulp.src(options.src + '/sass/global.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.src + '/css'));
});

