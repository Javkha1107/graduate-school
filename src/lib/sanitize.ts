import sanitizeHtml from "sanitize-html";

/**
 * Sanitize and clean HTML content from the rich text editor for safe rendering.
 *
 * Uses sanitize-html (pure Node.js, no jsdom dependency) so it works reliably
 * in Vercel serverless environments.
 *
 * - Fixes protocol-less links (www.example.com → https://www.example.com)
 * - Strips pasted background-color inline styles
 * - Removes invisible Unicode characters from copy-paste
 * - Converts plain-text newlines to <br> when no block-level tags exist
 * - Sanitizes against XSS
 * - Only allows text-align, color, and text-decoration in inline styles
 * - Opens external links in new tabs
 */
export function sanitizeNewsHtml(html: string): string {
  // Pre-processing (operates on raw string)
  let result = html
    // Fix protocol-less links
    .replace(/href="(www\.)/gi, 'href="https://$1')
    // Strip background-color inline styles (from Word/Google Docs paste)
    .replace(/background-color\s*:\s*[^;"']+;?/gi, "")
    .replace(/background\s*:\s*(?!.*(?:url|gradient))[^;"']+;?/gi, "")
    // Remove empty style attributes left behind
    .replace(/\s*style="\s*"/gi, "")
    // Remove invisible Unicode characters
    .replace(/[\u00AD\u200B\u200C\u200D\uFEFF]/g, "");

  // If content has no block-level HTML tags, treat as plain text
  const hasBlockTags =
    /<(?:p|div|br|ul|ol|li|h[1-6]|table|blockquote|pre|hr)\b/i.test(result);
  if (!hasBlockTags) {
    result = result.replace(/\n/g, "<br>");
  }

  // Allowed CSS properties (mirrors the old DOMPurify hook)
  // sanitize-html expects { tag: { property: [RegExp] } }
  const allowedStyles: Record<string, Record<string, RegExp[]>> = {
    "*": {
      "text-align": [/.*/],
      color: [/.*/],
      "text-decoration": [/.*/],
    },
  };

  // Sanitize with sanitize-html
  result = sanitizeHtml(result, {
    allowedTags: [
      // Default inline / block tags
      ...sanitizeHtml.defaults.allowedTags,
      // Extra tags the Quill editor may produce
      "iframe",
      "img",
      "h1",
      "h2",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "style"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      iframe: [
        "src",
        "allow",
        "allowfullscreen",
        "frameborder",
        "width",
        "height",
      ],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
    },
    allowedStyles,
    allowedSchemes: ["http", "https", "mailto"],
    allowedIframeHostnames: [
      "www.youtube.com",
      "youtube.com",
      "player.vimeo.com",
    ],
  });

  // Post-processing: make external links open in new tab
  result = result.replace(
    /<a\s+([^>]*href="https?:\/\/[^"]*"[^>]*)>/gi,
    (match, attrs: string) => {
      if (attrs.includes("target=")) return match;
      return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
    },
  );

  return result;
}
