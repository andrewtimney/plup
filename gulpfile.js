var gulp = require('gulp');
var babel = require("gulp-babel");

gulp.task('build', function(){
  return gulp.src(["./src/**/**.js", "./src/**/**.jsx"])
   .pipe(babel())
   .pipe(gulp.dest("./build"));
});

gulp.task('build-test', function(){
  return gulp.src("./test/src/**.js")
   .pipe(babel())
   .pipe(gulp.dest("./test/build"));
});

gulp.task('watch', function() {
  gulp.watch(["./test/src/**.js"], ['build-test']);
  gulp.watch(["./src/**/**.js", "./src/**/**.jsx"], ['build']);
});
