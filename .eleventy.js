const markdown = require('markdown-it')
const attrs = require('markdown-it-attrs')
const ampPlugin = require('@ampproject/eleventy-plugin-amp')
const typeset = require('eleventy-plugin-typeset')
const htmlmin = require('html-minifier')
const sitemap = require('@quasibit/eleventy-plugin-sitemap')

module.exports = function(eleventyConfig){

    //AMP Plugin
    eleventyConfig.addPlugin(ampPlugin, {
        filter: /^.*(index|profil|posts|aspirasi|404|offline).*$/,
        dir: {
            output: 'dist'
        }
    })

    //typeset plugin
    eleventyConfig.addPlugin(typeset({
        disable: ['ligatures', 'hyphenate']
    }))

    //sitemap
    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: 'https://kotimbercahaya.net'
        }
    })

    //local filters
    eleventyConfig.addPlugin(require('./plugins'))

    //layout aliases
    eleventyConfig.addLayoutAlias('base', 'layout/base.html')
    eleventyConfig.addLayoutAlias('layout', 'layout/layout.html')
    eleventyConfig.addLayoutAlias('content', 'layout/content.html')
    eleventyConfig.addLayoutAlias('page', 'layout/page.html')
    eleventyConfig.addLayoutAlias('post', 'layout/post.html')
    eleventyConfig.addLayoutAlias('soon', 'layout/soon.html')

    //passthrough copy assets
    eleventyConfig.addPassthroughCopy({
        'src/_assets': 'assets',
        'src/_assets/static': '.'
    })

    //markdown config
    let markdownLib = markdown({
        html: true,
        linkify: true,
    })
    .use(attrs)
    eleventyConfig.setLibrary('md', markdownLib)

    //minify output
    eleventyConfig.addTransform('minify', function(content, outputPath) {
        if (outputPath.endsWith('.html')) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                removeTagWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                processScripts: [
                    "text/javascript",
                    "application/ld+json"
                ]
            })
            return minified
        }
        return content
    })

    // default i/o directory
    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}