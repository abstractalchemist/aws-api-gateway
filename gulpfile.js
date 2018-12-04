const gulp = require('gulp')
const browersify = require('browserify')

gulp.task('js', function() {
   console.log('starting js');
})

gulp.task('default', ['js'], function() {
   return gulp.watch(['src/**/*js', 'test/**/*js'], ['js')
})
