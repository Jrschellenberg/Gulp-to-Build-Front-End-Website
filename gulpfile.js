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
			imageMin = require('gulp-imagemin'),
			browserSync = require('browser-sync').create();



const options = {
	src: 'src',
	dist: 'dist'
};

/*
task to delete the whole dist folder.
 */
gulp.task('clean', function(){
	return del(['dist']);
});

/*
Task to compress images and place them into dist folder.
 */
gulp.task('images', function(){
	gulp.src(options.src + '/images/*')
		.pipe(imageMin())
		.pipe(gulp.dest(options.dist + '/images'));
});


/*
 The task process to compile sass into css, places css into dist folder with mapping to sass.
 */
gulp.task('styles', function(){
	return gulp.src(options.src + '/sass/global.scss')
		.pipe(maps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/css'));
});

/*
Task to map, concat, compress and place files into dist folder with mapping to original js.
 */
gulp.task('scripts', ['clean'], function(){
	return gulp.src([
		options.src + '/js/circle/autogrow.js',
		options.src + '/js/circle/circle.js'])
		.pipe(maps.init())
		.pipe(concat("app.js"))
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/scripts'));
});

gulp.task('js-watch', ['build'], function(){
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

/*
task run to watch the js files, first builds project into dist. points server to dist folder, then watches for any changes in src file. when change happens
rebuilds the dist folder and reloads the page with js-watch task.
 */
gulp.task('watch', ['build'], function(){
	browserSync.init({
		port: 3000,
		server: {
			baseDir: options.dist
		}
	});
	
	gulp.watch(options.src + '/js/**', ['js-watch']);
});

gulp.task('build', ['scripts', 'styles', 'images'], function(){
	return gulp.src([
			options.src + "/icons/**",
			options.src + "/index.html"
		], { base: './'+options.src})
		.pipe(gulp.dest(options.dist));
	//gulp.start('scripts');
	//gulp.start('styles');
	//return gulp.start('images');
});

gulp.task('default', ['build']);
