const gulp = require('gulp')
const browserify = require('browserify')
const mocha = require('gulp-mocha')
const babelify = require('babelify')
const fs = require('fs')


gulp.task('test', function() {
   return gulp.src('test/**/*js').pipe(mocha({compilers:'js:@babel/register', exit:true, require:"test/init.js"}))
})

gulp.task('js', ['test'], function() {
   return browserify('src/index.js')
      .transform('babelify')
      .bundle()
      .pipe(fs.createWriteStream('dist/bundle.js'))
})


gulp.task('cp', function() {
   return gulp.src('public/*')
      .pipe(gulp.dest('dist'))
})

gulp.task('default', ['js', 'cp'], function() {
   return gulp.watch(['src/**/*js', 'test/**/*js'], ['js'])
})
