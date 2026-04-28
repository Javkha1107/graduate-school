import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize and clean HTML content from the rich text editor for safe rendering.
 *
 * - Fixes protocol-less links (www.example.com → https://www.example.com)
 * - Strips pasted background-color inline styles
 * - Removes invisible Unicode characters from copy-paste
 * - Converts plain-text newlines to <br> when no block-level tags exist
 * - Sanitizes against XSS via DOMPurify
 * - Opens external links in new tabs
 */
export function sanitizeNewsHtml(html: string): string {
  // Pre-processing before DOMPurify (operates on raw string)
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

  // Sanitize with DOMPurify — allow safe HTML tags from the editor
  // Quill uses inline style="text-align:center" and class="ql-align-center"
  // for alignment, so we must allow the style attribute through.
  // We use a hook to whitelist only safe CSS properties.
  DOMPurify.addHook("uponSanitizeAttribute", (_node, data) => {
    if (data.attrName === "style") {
      // Only keep text-align, color, and text-decoration from inline styles
      const allowed = data.attrValue
        .split(";")
        .map((s: string) => s.trim())
        .filter((s: string) => {
          const prop = s.split(":")[0]?.trim().toLowerCase();
          return (
            prop === "text-align" ||
            prop === "color" ||
            prop === "text-decoration"
          );
        })
        .join("; ");
      data.attrValue = allowed || "";
      if (!allowed) data.keepAttr = false;
    }
  });

  result = DOMPurify.sanitize(result, {
    ADD_TAGS: ["iframe", "table", "thead", "tbody", "tr", "td", "th"],
    ADD_ATTR: [
      "target",
      "rel",
      "allow",
      "allowfullscreen",
      "frameborder",
      "class",
      "style",
      "colspan",
      "rowspan",
    ],
    ALLOW_DATA_ATTR: false,
  });

  // Remove the hook so it doesn't accumulate on repeated calls
  DOMPurify.removeHook("uponSanitizeAttribute");

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
