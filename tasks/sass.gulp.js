const gulp = require('gulp')
const changed = require('gulp-changed')
const pipeline = require('readable-stream').pipeline
const replace = require('gulp-replace')
const sass = require('gulp-sass')
sass.compiler = require('sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const importcss = require('postcss-import-url')

const SRC = './src/_sass/main.scss'
const DEST = './src/_includes/stylesheet/'
const WATCH = './src/_sass/*.scss'

gulp.task('compilecss', function() {
    const processors = [
        autoprefixer, importcss
    ]

    return pipeline(
        gulp.src(SRC),
        changed(DEST),
        sass(),
        postcss(processors),
        replace(' !important', ''),
        gulp.dest(DEST)
    )
})

gulp.task('watchcompilecss', function() {
    gulp.watch(WATCH, gulp.parallel('compilecss'))
})