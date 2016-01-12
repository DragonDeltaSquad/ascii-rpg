var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');

var srcScriptsPath = 'js';
var destScriptsPath = 'dist/js';
    
    
gulp.task('clean_dist', function () {
  return del(['dist/*']);
});
gulp.task('copy_app', function () {
    gulp
        .src(['html/*'])
        .pipe(gulp.dest('dist'))
    return gulp
        .src(['img/**/*.*',
            'sounds/**/*.*',
            'res/**/*.*',
            'run/**/*.*'],
            { base: './' })
        .pipe(gulp.dest('dist'))
});

// from official recipe https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('compile_js', function() {
   var folders = getFolders(srcScriptsPath);

   var tasks = folders.map(function(folder) {
      // concat into foldername.js
      // write to output
      // minify
      // rename to folder.min.js
      // write to output again
      return gulp.src(path.join(srcScriptsPath, folder, '/**/*.js'))
        .pipe(concat(folder + '.js'))
        .pipe(gulp.dest(destScriptsPath))
        .pipe(uglify())
        .pipe(rename(folder + '.min.js'))
        .pipe(gulp.dest(destScriptsPath));
   });

   // process all remaining files in scriptsPath root 
   //  into main.js and main.min.js files
   var root = gulp.src(path.join(srcScriptsPath, '/*.js'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destScriptsPath))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(destScriptsPath));

   return merge(tasks, root);
});

gulp.task('default', ['clean_dist', 'copy_app','compile_js']);
