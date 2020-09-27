const ampPlugin = require('@ampproject/eleventy-plugin-amp')

module.exports = function(eleventyConfig){

    //AMP Plugin
    eleventyConfig.addPlugin(ampPlugin)

    //layout aliases
    eleventyConfig.addLayoutAlias('base', 'layout/base.html')
    eleventyConfig.addLayoutAlias('layout', 'layout/layout.html')
    eleventyConfig.addLayoutAlias('home', 'layout/home.html')

    //passthrough copy assets
    eleventyConfig.addPassthroughCopy({
        'src/_assets': 'assets'
    })

    // default i/o directory
    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}