var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require("gulp-uglify"),
    cssnano = require('gulp-cssnano'),
    concat = require("gulp-concat"),
    rename = require('gulp-rename'),
    order = require('gulp-order'),
    babel = require('gulp-babel'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    del = require('del'),
    connect = require('gulp-connect');


gulp.task('clean', function() {
    return del(['dist/*']);
});

gulp.task('images', function() {
    return gulp.src(['src/images/*', 'src/assets/*.png'])
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function() {
    return gulp.src('src/assets/fonts/*')
        .pipe(gulp.dest('dist/assets/fonts/'));
});

gulp.task('sound', function() {
    return gulp.src('src/sound/*')
        .pipe(gulp.dest('dist/assets/sound/'));
});

gulp.task('jsmin', function() {

   gulp.src('./src/assets/js/*.js')
        // .pipe(uglify())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(rev.manifest({
            base:'dist',
            merge: true
        }))
        .pipe(gulp.dest('./dist'));

    return gulp.src(['./src/assets/vendor/*.js', './config.js'])
        .pipe(order([
            'jquery*.js',
            'adapter.js',
            'popper.js',
            'bootstrap-material-design.min.js',
            'config.js',
            '*.js'
        ]))
        .pipe(concat("vendor-bundle.js"))
        .pipe(rev())
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(rev.manifest({
            base:'dist',
            merge: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('cssmin', function() {
    return gulp.src('./src/assets/css/*.css')
        .pipe(order([
            'font-awesome.min.css',
            'bootstrap.css'
        ]))
        //.pipe(cssnano())
        .pipe(concat('bundle.css'))
        .pipe(rev())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(rev.manifest({
            base: 'dist',
            merge: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist'))
});

gulp.task('rev', function() {
    gulp.src(['rev-manifest.json', 'dist/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['build']);
    gulp.watch('config.js', ['build']);
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 8888
    });
});

gulp.task('build', ['jsmin', 'cssmin', 'htmlmin', 'images', 'fonts', 'sound'], () => {
    gulp.start('rev')
})

gulp.task("dist", ['clean'], () => {
    gulp.start('build')
});

gulp.task("default", ['build', 'connect', 'watch']);