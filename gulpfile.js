var gulp = require('gulp');
var util = require('gulp-util');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var imagemin = require('gulp-imagemin');
var pngmin = require('gulp-pngmin');
var rename = require('gulp-rename');
var argv = require('minimist')(process.argv.slice(2));
var minifyCSS = require('gulp-minify-css');
var defineModule = require('gulp-define-module');

var path = {
  layouts: './src/layouts/**/*.jade',
  jade: './src/**/*.jade',
  stylus: './src/stylus/*.styl',
  stylusAll: './src/stylus/**/*.styl',
  scripts: {
    app: './src/scripts/app/**/*.ls',
    vendor: './src/scripts/vendor/**/*.js',
    modules: {
      main: './src/scripts/app/main.ls',
      templates: './src/scripts/app/templates/**/*.jade'
    }
  },
  images: {
    jpg: './src/images/**/*.jpg',
    png: './src/images/**/*.png'
  }
};

gulp.task('compile:html', function() {
  gulp.src([path.jade, '!'+path.layouts, '!'+path.scripts.modules.templates])
    .pipe(jade())
    .pipe(gulp.dest('./build/'))
});

gulp.task('compile:css', function () {
  var t = gulp.src(path.stylus);
  t = t.pipe(stylus({use: [nib()]}));

  if (argv.c) {
    t = t.pipe(minifyCSS());
  }

  t = t.pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('browserify:app', ['compile:templates'], function() {
  var t = gulp.src(path.scripts.modules.main, { read: false });

  t = t.pipe(browserify({
    transform: ['liveify'],
    extensions: ['.ls']
  }));

  if (argv.u) {
    t = t.pipe(uglify());
  }

  t = t.pipe(rename('app.js'));
  t = t.pipe(gulp.dest('./build/scripts'));
});

gulp.task('concat:scripts:vendor', function() {
  var t = gulp.src(path.scripts.vendor);
  t = t.pipe(concat("vendor.js"));

  if (argv.u) {
    t = t.pipe(uglify());
  }

  t = t.pipe(gulp.dest('./build/scripts/'));
});

gulp.task('compile:templates', function() {
  var t = gulp.src(path.scripts.modules.templates);
  t = t.pipe(jade({client: true}));
  t = t.pipe(defineModule('node'));
  t = t.pipe(gulp.dest('./src/scripts/app/templates'));
});

gulp.task('compress:jpg', function() {
  gulp.src(path.images.jpg)
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('compress:png', function() {
  gulp.src(path.images.png)
    .pipe(pngmin())
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('compress:images', ['compress:jpg', 'compress:png']);

gulp.task('build', ['compile:html', 'compile:css', 'browserify:app', 'concat:scripts:vendor', 'compress:images']);

gulp.task('watch', function() {
  gulp.watch(path.jade, ['compile:html']);
  gulp.watch(path.scripts.modules.templates, ['compile:templates', 'browserify:app']);
  gulp.watch(path.stylusAll, ['compile:css']);
  gulp.watch(path.scripts.app, ['browserify:app']);
  gulp.watch(path.scripts.vendor, ['concat:scripts:vendor']);
});

gulp.task('default', ['build', 'watch']);
