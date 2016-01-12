var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');
    
gulp.task('copy_app', function () {
  return gulp
    .src(['html/*',
        'img/**/*.*',
        'sounds/**/*.*',
        'run/**/*.*'],
        { base: './' })
    .pipe(gulp.dest('dist'))
});

gulp.task('compile_js', function() {
    gulp.src(['js/sprites.js'])
            .pipe(gulp.dest('./dist/js/'));
    gulp.src(['js/maze.js'])
            .pipe(gulp.dest('./dist/js/'));
    gulp.src(['js/sample_world.js'])
            .pipe(gulp.dest('./dist/js/'));
    return gulp.src(['js/asciiRPG.js'])
            .pipe(gp_concat('asciiRPG.js'))
            .pipe(gp_uglify())
            .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['copy_app','compile_js']);
