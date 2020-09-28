module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter(
        'dateReadable', require('./dateReadable')
    )
}