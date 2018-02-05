var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('sass',function () {
	return gulp.src('app/scss/style.scss')
	  .pipe(sass())
	  .pipe(gulp.dest('app/css'))
	  .pipe(browserSync.reload({
	  	stream:true
	  }))
});

// tao web serve
gulp.task('browserSync', function() {
    browserSync.init({
    	server: {
    		baseDir:'app'
    	},
    })
});


// theo doi su thay doi cua file sass
// ['browserSync','sass',...] ghi mang cac task phai hoan thanh truoc khi watch duoc phep chay 
gulp.task('watch', ['browserSync','sass','useref','images','fonts'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// dung de toi uu hoa file - gop cac file
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))

    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

