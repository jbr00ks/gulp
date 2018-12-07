const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const webserver = require('gulp-webserver');

gulp.task('message', function(){
    console.log('Gulp is running...');
});

gulp.task('html', function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('imageMin', function(){
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('minify', function(){
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('hint', function(){
    gulp.src('src/sass/*.scss')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//gulp.task('server', function(){
//    gulp.src('dist')
//    .pipe(webserver({
//        port: '4000',
//        livereload: true,
//        open: true
//    }));
//});

gulp.task('default', ['message', 'html', 'imageMin', 'sass', 'scripts', 'hint']);

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
});