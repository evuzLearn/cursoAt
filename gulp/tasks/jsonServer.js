'use strict';

var gulp       = require('gulp');
var rename     = require('gulp-rename');
var jsonServer = require('gulp-json-srv');

var server = jsonServer.create({
    port: 3030
});

gulp.task('jsonServer', ['restoreDB'], function(){
    return gulp.src('data/db-original.json')
        .pipe(server.pipe());
});

gulp.task('restoreDB', function() {
    return gulp.src('data/db-original.json')
        .pipe(rename('db.json'))
        .pipe(gulp.dest('data'));
});