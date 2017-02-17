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

gulp.task('concatScripts', function(){
		return gulp.src([
			options.src + '/js/circle/autogrow.js',
			options.src + '/js/circle/circle.js',
			'js/main.js'])
			.pipe(maps.init())
			.pipe(concat("app.js"))
			.pipe(maps.write('./'))
			.pipe(gulp.dest(options.dist + '/scripts'));
});

gulp.task('minifyScripts', ["concatScripts"], function(){
	return gulp.src(options.src +"/js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('clean', function(){
	del(['dist', 'css/global.css*', 'scripts/app*.js*']);
});




/*
The task process to compile sass into css.
 */
gulp.task('compileSass', function(){
	return gulp.src(options.src + '/sass/global.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/css'));
});

