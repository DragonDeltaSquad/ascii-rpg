var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var jshint = require('gulp-jshint');

var srcScriptsPath = 'js';
var destScriptsPath = 'dist/js';
    
    
gulp.task('clean_dist', function () {
  try{
    del(['dist/*']);
    console.log("Cleaned old files");
  }catch(e){
    console.log("Could not clean old files");
  }
  return true;
});

gulp.task('copy_app', ['clean_dist'], function () {
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

gulp.task('compile_js', ['clean_dist'], function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(destScriptsPath));
    return gulp
        .src(['global.js',
            'sound.js',
            'compositor.js',
            'sprite.js',
            'animated_sprite.js',
            'room.js',
            'game_object.js',
            'actor.js',
            'game.js',
            'world.js',
            'hud.js',
            'title_screen.js',
            'importers.js',
            'input.js'],
            { cwd: 'js/asciiRPG/' })
        .pipe(concat('asciiRPG.js'))
        .pipe(gulp.dest(destScriptsPath))
        .pipe(uglify())
        .pipe(rename('asciiRPG.min.js'))
        .pipe(gulp.dest(destScriptsPath));
});

gulp.task('lint', function() {
  return gulp.src('./dist/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['copy_app','compile_js']);
