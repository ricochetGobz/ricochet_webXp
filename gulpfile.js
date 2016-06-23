var gulp = require('gulp')
var sass = require('gulp-sass')
var babel = require('gulp-babel')
var browserSync = require('browser-sync')

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(gulp.dest('dist/images'))
})
gulp.task('css',['sass'], function(){
  return gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('dist/css'))
})
gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(gulp.dest('dist'))
})
gulp.task('js', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/js'));
})
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.+(scss|sass)', ['sass'])
  gulp.watch('app/*.html', browserSync.reload)
  gulp.watch('app/js/**/*.js', browserSync.reload)
})
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('build',['css','fonts','html','js','images'] , function() {
  console.log('Building Dude, I\'m Building dude ... ');
})
