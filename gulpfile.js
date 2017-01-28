var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require('gulp-watch');
var jsdoc = require('gulp-jsdoc3');

var paths = {
  scripts: './src/js/**/*.js',
  styles: './src/css/**/*.css',
  readme: './README.md'
}

/** Default task is set to watch files for changes for continuous building */
gulp.task('default', watchScripts);
function watchScripts() {
  gulp.watch(paths.scripts, ['build']);
  gulp.watch(paths.styles, ['build']);
}

/** Project standard build process */
gulp.task('build', ['move-assets']);

gulp.task('move-assets', function() {
  // Move JS files
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/assets/js'));

  // Move CSS files
  gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest('./dist/assets/css'));
});

/** Task to generate documentation from code comments */
gulp.task('watch-doc', watchDocumentation)
function watchDocumentation() {
  gulp.watch(paths.readme, ['doc']);
  gulp.watch(paths.scripts, ['doc']);
}

gulp.task('doc', function (cb) {
  var filesToDocument = ['README.md', './src/js/*.js'];
    gulp.src(filesToDocument, { read: false })
      .pipe(jsdoc(cb));
});

/** Run Jasmine behavioral testing */
gulp.task('test', function() {
  var requiredTestFiles = [
    'src/js/vendor/underscore-min.js',
    'src/js/vendor/jquery.min.js',
    'src/js/vendor/backbone-min.js',
    'src/js/vendor/backbone.localStorage-min.js',
    'src/js/*.js',
    'spec/*_spec.js'
  ];

  return gulp.src(requiredTestFiles)
    .pipe(watch(requiredTestFiles))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 8888 }));
});
