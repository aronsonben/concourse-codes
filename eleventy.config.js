module.exports = async function(eleventyConfig) {
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("*.html");
};

module.exports.config = {
  pathPrefix: "/blog/",
  markdownTemplateEngine: "njk",
  templateFormats: ["html", "md", "njk"],
  dir: {
    input: "blog",
    includes: "_includes",
  }
}