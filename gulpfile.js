var gulp = require('gulp')
var sass = require('gulp-sass')
var gutil = require('gulp-util')
var cssNano = require('gulp-cssnano')
var concat = require('gulp-concat')
var plumber = require('gulp-plumber')
var uglify = require('gulp-uglify')
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync')
var merge = require('merge-stream')
var del = require('del')

var config = {
  sassPath: './assets/sass/',
  jsPath: './assets/scripts/',
  publicPath: './public/',
  npmDir: './node_modules/'
}

gulp.task('copy', function () {
  var basscss = gulp.src(config.npmDir + 'basscss-sass/scss/**/*.scss')
  .pipe(gulp.dest(config.sassPath + 'vendor/basscss-sass/'))

  var normalizecss = gulp.src(config.npmDir + 'normalizecss/normalize.css')
  .pipe(gulp.dest(config.sassPath + 'vendor/normalizecss/'))

  var jquery = gulp.src(config.npmDir + 'jquery/dist/jquery.min.js')
  .pipe(gulp.dest(config.publicPath + 'scripts/'))

  var matchHeight = gulp.src(config.npmDir + 'jquery-match-height/dist/jquery.matchHeight-min.js')
  .pipe(gulp.dest(config.jsPath + 'vendor/'))

  return merge(
    basscss,
    normalizecss,
    jquery,
    matchHeight
  )
})

gulp.task('build-css', function () {
  gulp.src([
    config.sassPath + 'app.scss'
  ])
  .pipe(plumber())
  .pipe(sass().on('error', gutil.log))
  .pipe(autoprefixer({
    browers: [
      'last 2 version',
      'IE 8'
    ]
  }))
  .pipe(cssNano().on('error', gutil.log))
  .pipe(concat('micro-finance.min.css'))
  .pipe(gulp.dest(config.publicPath + 'css/'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('build-js', function () {
  gulp.src([
    config.jsPath + 'vendor/jquery.matchHeight-min.js',
    config.jsPath + 'jquery.inputmask.bundle.min.js',
    config.jsPath + 'pushy.min.js',
    config.jsPath + 'slick.min.js',
    config.jsPath + 'sweetalert.min.js',
    config.jsPath + 'jquery.modal.min.js',
    config.jsPath + 'main.js'
  ])
  .pipe(plumber())
  .pipe(uglify().on('error', gutil.log))
  .pipe(concat('micro-finance.min.js'))
  .pipe(gulp.dest(config.publicPath + 'scripts/'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('watch', function () {
  gulp.watch(config.publicPath + '*.js', browserSync.reload)
  gulp.watch(config.publicPath + '*.css', browserSync.reload)
  gulp.watch(config.publicPath + '*.html', browserSync.reload)
  browserSync.init({
    injectChanges: true,
    server: './public',
    open: false,
    domain: 'http://localhost:3000'
  })
})

gulp.task('clean', function () {
  return del([config.publicPath + 'css', config.publicPath + 'scripts', config.sassPath + 'vendor', config.jsPath + 'vendor'])
})

gulp.task('build', ['copy', 'build-css', 'build-js'])
gulp.task('default', ['watch'])
