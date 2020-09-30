const gulp = require('gulp')
const workbox = require('workbox-build')

const SRC = 'src/_sw/sw.js'
const DEST = 'dist/sw.js'

gulp.task('generatesw', () => {
    return workbox.injectManifest({
        swSrc: SRC,
        swDest: DEST,
        globDirectory: 'dist',
        globPatterns: [
            '*.*',
            '**/index.html',
            'assets/**/*.*'
        ],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
    })
})

gulp.task('watchsw', function() {
    gulp.watch(SRC, gulp.parallel('generatesw'))
})