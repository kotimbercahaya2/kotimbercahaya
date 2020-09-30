const markdown = require('markdown-it')
const attrs = require('markdown-it-attrs')
const ampPlugin = require('@ampproject/eleventy-plugin-amp')
const typeset = require('eleventy-plugin-typeset')

module.exports = function(eleventyConfig){

    //AMP Plugin
    eleventyConfig.addPlugin(ampPlugin, {
        filter: /^.*(index|profil|posts|aspirasi|404|offline).*$/,
        dir: {
            output: 'dist'
        },
        imageOptimization: {
            urlPath: '/assets/img/o/'
        }
    })

    //typeset plugin
    eleventyConfig.addPlugin(typeset({
        disable: ['ligatures', 'hyphenate']
    }))

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
        'src/_assets/favicons': '.'
    })

    //markdown config
    let markdownLib = markdown({
        html: true,
        linkify: true,
    })
    .use(attrs)
    eleventyConfig.setLibrary('md', markdownLib)

    // default i/o directory
    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}