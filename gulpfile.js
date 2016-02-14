const gulp = require('gulp');

const clean = require('gulp-clean');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const webserver = require('gulp-webserver');

gulp.task('clean', ()=> {
    const buildDir = gulp.src('./build/*', {read: false});
    buildDir.pipe(clean());
});

gulp.task('deploy', ()=> {
    const appJS = gulp.src(['./src/js/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./build'));

    gulp.src('./src/index.html')
        .pipe(inject(appJS, {ignorePath: 'build'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('serve', function() {
    gulp.src('build').pipe(webserver({
        host : 'localhost',
        port : 8000,
        https : true
    }));
});

gulp.task('default', ['clean', 'deploy', 'serve']);