const gulp = require('gulp');

const browserify = require('browserify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const es = require('event-stream');
const inject = require('gulp-inject');
const webserver = require('gulp-webserver');
const vinylSource = require('vinyl-source-stream');

gulp.task('clean', ()=> {
    const buildDir = gulp.src('./build/*', {read: false});
    buildDir.pipe(clean());
});

gulp.task('deploy', ()=> {
    const jsBundle =
        browserify('./src/js/index.js')
        .bundle()
        .pipe(vinylSource('bundle.js'))
        .pipe(gulp.dest('./build'));

    const cssBundle =
        gulp.src(['./src/css/normalize.css', './src/css/main.css'])
            .pipe(concat('style.css'))
            .pipe(gulp.dest('./build'));

    gulp.src('./src/index.html')
        .pipe(inject(es.merge(jsBundle, cssBundle), {ignorePath: 'build'}))
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