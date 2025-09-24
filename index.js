// Seanime Portuguese Translate Extension
// No UI, translates metadata fields to Portuguese

const TARGET_LANG = "pt";

// LibreTranslate API (can be replaced with another translation service)
async function translateText(text) {
  if (!text) return text;
  const response = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: TARGET_LANG,
      format: "text"
    })
  });
  const data = await response.json();
  return data.translatedText || text;
}

// Seanime extension API entry point
module.exports = async function(metadata) {
  // Translate common fields
  if (metadata.title) {
    metadata.title = await translateText(metadata.title);
  }
  if (metadata.description) {
    metadata.description = await translateText(metadata.description);
  }
  if (metadata.synopsis) {
    metadata.synopsis = await translateText(metadata.synopsis);
  }
  // Add more fields as needed

  return metadata;
};
