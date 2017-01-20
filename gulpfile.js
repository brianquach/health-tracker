var gulp = require('gulp');

var paths = {
  scripts: './src/js/**/*.js',
  styles: './src/css/**/*.css'
}

gulp.task('move-assets', function() {
  // Move JS files
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/assets/js'));

  // Move CSS files
  gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('build', ['move-assets']);
gulp.task('default', watch);

function watch() {
    gulp.watch(paths.scripts, ['build']);
    gulp.watch(paths.styles, ['build']);
}
