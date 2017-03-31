const gulp = require('gulp');
const node = require('gulp-nodemon');

gulp.task('node', () => {
  node({
    script: 'app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    ignore: './public'
  })
});

gulp.task('default', ['node']);