var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var through2 = require('through2');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var tools = require('aurelia-tools');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var fs = require('fs');

var jsName = paths.packageName + '.js';

gulp.task('build-es6', function () {
  return gulp.src(paths.source)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-commonjs', function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'common'}, {plugins: []})))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'amd'}, {plugins: []})))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'system'}, {plugins: []})))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-dts', function() {
  var os = require('os');

  var opts = {

      // Required

      // name of module likein package.json
      // - used to declare module & import/require
      name: 'aurelia-mediator',
      // path to entry-point (generated .d.ts file for main module)
      // - either relative or absolute
      main: 'src/index.d.ts',

      // Optional

      // base directory to be used for discovering type declarations (i.e. from this project itself)
      // - default: dirname of main
      baseDir: 'src',
      // path of output file
      // - default: "<baseDir>/<name>.d.ts"
      out: '../dist/aurelia-mediator.d.ts',
      // include typings outside of the 'baseDir' (i.e. like node.d.ts)
      // - default: false
      externals: false,
      // filter to exclude typings, either a RegExp or a callback. match path relative to opts.baseDir
      // - RegExp: a match excludes the file
      // - function: (file:String, external:Boolean) return true to exclude, false to allow
      // - always use forward-slashes (even on Windows)
      // - default: *pass*
      exclude: /^defs\/$/,
      // delete all source typings (i.e. "<baseDir>/**/*.d.ts")
      // - default: false
      removeSource: false,
      // newline to use in output file
      newline: os.EOL,
      // indentation to use in output file
      // - default 4 spaces
      indent: '   ',
      // prefix for rewriting module names
      // - default '__'
      prefix: '__',
      // separator for rewriting module 'path' names
      // - default: forward slash (like sub-modules)
      separator: '/',
      // enable verbose mode, prints detailed info about all references and includes/excludes
      // - default: false
      verbose: false,
  };

  // require module
  var dts = require('dts-bundle');

  // run it
  dts.bundle(opts);
  var dtsFile = 'aurelia-mediator.d.ts';
  fs.createReadStream('dist/' + dtsFile).pipe(fs.createWriteStream('dist/es6/' + dtsFile));
  fs.createReadStream('dist/' + dtsFile).pipe(fs.createWriteStream('dist/system/' + dtsFile));
  fs.createReadStream('dist/' + dtsFile).pipe(fs.createWriteStream('dist/amd/' + dtsFile));
  fs.createReadStream('dist/' + dtsFile).pipe(fs.createWriteStream('dist/commonjs/' + dtsFile));
})


gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    'build-dts',
    callback
  );
});
