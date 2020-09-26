const gulp = require('gulp')
const shell = require('gulp-shell')
require('require-dir')('./tasks')

gulp.task('build', gulp.series(
    'compilecss',
    shell.task('npx @11ty/eleventy')
))

gulp.task('serve', gulp.series(
    'build', gulp.parallel(
        'watchcompilecss',
        shell.task('npx @11ty/eleventy --serve')
    )
))