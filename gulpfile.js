const gulp = require('gulp')
const shell = require('gulp-shell')
require('require-dir')('./tasks')

gulp.task('build', gulp.series(
    'compilecss',
    shell.task('npx @11ty/eleventy'),
    'generatesw'
))

gulp.task('serve', gulp.series(
    'build', gulp.parallel(
        'watchcompilecss',
        'watchsw',
        shell.task('npx @11ty/eleventy --serve')
    )
))