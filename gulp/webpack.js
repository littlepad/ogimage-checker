import gulp from 'gulp';
import webpack from 'gulp-webpack';
import config from '../webpack.config.babel';

export default function js() {
  return gulp.src(config.entry.index)
    .pipe(webpack(config))
    .pipe(gulp.dest(config.output.path));
}
