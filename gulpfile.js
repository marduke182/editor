var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();


gulp.task('dependencies', function(){
  var sources = gulp.src(['src/**/*.js','app/styles/**/*.css'], {read:false});
    gulp.src('app/index.html')
      .pipe(plugins.inject(sources,{relative: true}))
      .pipe(gulp.dest('app/'));
});




gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(plugins.webserver({
      host:             '0.0.0.0',
      port:             9090,
      livereload:       true,
      directoryListing: false,
          //fallback: 'app/index.html',
      open: true
    }));
});

