module.exports = async function(eleventyConfig) {
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("stylez.css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("*.html");
};

module.exports.config = {
  pathPrefix: "/blog/",
  htmlTemplateEnginer: "html",
  markdownTemplateEngine: "njk",
  templateFormats: ["html", "md", "njk"],
  dir: {
    input: "blog",
    includes: "_includes",
  }
}