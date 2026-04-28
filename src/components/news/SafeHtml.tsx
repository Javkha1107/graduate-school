"use client";

import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

/**
 * Pre-process raw HTML before DOMPurify sanitization.
 */
function preProcess(html: string): string {
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

  return result;
}

/**
 * Sanitize HTML using browser-native DOMPurify (no jsdom needed).
 */
function sanitize(html: string): string {
  const preprocessed = preProcess(html);

  DOMPurify.addHook("uponSanitizeAttribute", (_node, data) => {
    if (data.attrName === "style") {
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

  let result = DOMPurify.sanitize(preprocessed, {
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

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = sanitize(html);
    }
  }, [html]);

  return <div ref={containerRef} className={className} />;
}
