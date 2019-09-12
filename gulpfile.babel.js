import gulp from 'gulp';
import PATH from './gulp/config';
import js from './gulp/webpack';
import sass from './gulp/sass';

gulp.task('js', () => js());
gulp.task('sass', () => sass());

gulp.task('default', () => {
  gulp.watch([`${PATH.js}**/*.js`, `${PATH.app}app.js`], ['lint', 'js']);
  gulp.watch(`${PATH.scss}**/*.scss`, ['sass']);
});
