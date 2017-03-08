import gulp from 'gulp';
import PATH from './gulp/config';
import js from './gulp/webpack';
import { lint, devLint } from './gulp/eslint';

gulp.task('js', () => js());
gulp.task('lint', () => lint());
gulp.task('devLint', () => devLint());

gulp.task('default', () => {
  gulp.watch(`${PATH.js}**/*.js`, ['lint', 'js']);
});
