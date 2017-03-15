import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import PATH from './config';

export default function css() {
  return gulp.src(`${PATH.scss}**/*.scss`)
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulp.dest(`${PATH.public}css/`));
}
