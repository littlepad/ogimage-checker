import gulp from 'gulp';
import eslint from 'gulp-eslint';
import PATH from './config';

export function lint() {
  return gulp.src([`${PATH.js}**/*.js`, `${PATH.app}app.js`])
    .pipe(eslint())
    .pipe(eslint.format());
}

// 開発周りのjsのlint
export function devLint() {
  return gulp.src(['./gulpfile.babel.js', './gulp/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
}

