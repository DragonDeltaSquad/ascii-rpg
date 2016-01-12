var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('default', function() {
    return gulp.src(['js/asciiRPG.js'])
            .pipe(gp_concat('asciiRPG.js'))
            .pipe(gp_uglify())
            .pipe(gulp.dest('./dist/js/'));
});
