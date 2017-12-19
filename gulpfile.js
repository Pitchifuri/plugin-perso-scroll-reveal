//déclaration des variables

var gulp = require ('gulp');
var sass = require ('gulp-sass');
var autoprefixer = require ('gulp-autoprefixer');
var browserSync = require ('browser-sync');
var gulpCleanCss = require ('gulp-clean-css');
var gulpUglify = require ('gulp-uglify');
var gulpHtmlmin = require ('gulp-htmlmin');
var gulpRename = require ('gulp-rename');

//déclaration des tâches

gulp.task('sassification', function () {
  return gulp.src('./src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 6 versions'],
    cascade: false}))
  .pipe(gulpCleanCss())
  .pipe(gulpRename(function(path){
    path.basename += ".min";
  }))
  .pipe(gulp.dest('./dist/css'));

});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(gulpHtmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglification', function() {
  return gulp.src('./src/js/*.js')
  .pipe(gulpRename(function(path){
    path.basename += ".min";
  }))
  .pipe(gulpUglify()).pipe(gulp.dest('./dist/js'));
});





//exécution des tâches

gulp.task('watch',['sassification','minify', 'browser-sync','uglification'], function () {
  gulp.watch('./src/sass/**/*.scss', ['sassification']);
  gulp.watch('./src/*.html', ['minify']);
  gulp.watch('./src/js/*.js', ['uglification']);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
