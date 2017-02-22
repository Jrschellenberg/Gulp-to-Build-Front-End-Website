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
			imageMin = require('gulp-imagemin'),
			browserSync = require('browser-sync').create(),
			csso = require('gulp-csso');     //implement this



const options = {
	src: 'src',
	dist: 'dist'
};

gulp.task('images', function(){
	gulp.src(options.src + '/images/*')
		.pipe(imageMin())
		.pipe(gulp.dest(options.dist + '/images'))
});

//
//gulp.task('concatScripts', function(){
//	return gulp.src([
//			//options.src + '/js/jquery-3.1.1.js',
//			options.src + '/js/circle/autogrow.js',
//			options.src + '/js/circle/circle.js'])
//		.pipe(maps.init())
//		.pipe(concat("app.js"))
//		.pipe(maps.write('./'))
//		.pipe(gulp.dest(options.src + '/scripts'));
//});
//
//
//
//gulp.task('minifyScripts', ["concatScripts"], function(){
//	return gulp.src(options.src +"/scripts/app.js")
//		.pipe(maps.init())
//		.pipe(uglify())
//		.pipe(rename('all.min.js'))
//		.pipe(maps.write('./'))
//		.pipe(gulp.dest(options.src + '/scripts'));
//});


gulp.task('scripts', ['clean'], function(){
	return gulp.src([
		options.src + '/js/circle/autogrow.js',
		options.src + '/js/circle/circle.js'])
		.pipe(maps.init())
		.pipe(concat("app.js"))
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/scripts'))
});

gulp.task('js-watch', ['scripts'], function(){
	return browserSync.reload();

	
});

gulp.task('serve', ['build'], function(){
	browserSync.init({
		port: 3000,
		server: {
			baseDir: options.dist
		}
	});
	
});



gulp.task('watch', ['scripts'], function(){
	browserSync.init({
		port: 3000,
		server: {
			baseDir: "./dist/"
		}
	});
	
	gulp.watch(options.src + '/js/**', ['js-watch']);
});



gulp.task('clean', function(){
	return del(['dist', 'css/global.css*', 'scripts/app*.js*']);
});



gulp.task('build', ['scripts', 'styles', 'images'], function(){
	return gulp.src([
			options.src + "/icons/**",
			options.src + "/index.html"
		], { base: './'+options.src})
		.pipe(gulp.dest(options.dist));
	//gulp.start('scripts');
	//gulp.start('styles');
	//gulp.start('images');
});


/*
The task process to compile sass into css.
 */
gulp.task('styles', function(){
	return gulp.src(options.src + '/sass/global.scss')
		.pipe(maps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/css'));
});


gulp.task('default', ['build']);
