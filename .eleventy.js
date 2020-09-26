module.exports = function(eleventyConfig){

    //layout aliases
    eleventyConfig.addLayoutAlias('base', 'layout/base.html')

    // default i/o directory
    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}