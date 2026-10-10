import test from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, renderMatchedPatterns, renderSourceCatalog } from "../src/ui/presentation.js";

test("HTML escaping blocks script injection characters", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)"> & it\'s'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; it&#39;s"
  );
});

test("matched pattern text and source links are escaped", () => {
  const dangerousPattern = {
    id: "AP-X",
    title: '<script>alert("title")</script>',
    mechanism: "Safe mechanism",
    functionalNeed: "Support safe rendering",
    tradeoffs: ["<svg onload=alert(1)>"],
    validationIdeas: ["check & verify"],
    contexts: [],
    provenance: { classes: ["vocspace-synthesis"], sourceIds: ["SRC-X"] },
    reviewStatus: "draft",
    resourceCategories: []
  };
  const dangerousSource = {
    id: "SRC-X",
    title: 'Source <img src=x onerror="x">',
    url: 'https://example.org/path?q="bad"&other=<bad>',
    limitations: ["<script>do not run</script>"]
  };
  const html = renderMatchedPatterns(
    [{ pattern: dangerousPattern, confidence: "possible match", reasons: ["Input <unsafe>"], matchedTerms: ["<term>"] }],
    [],
    [dangerousSource]
  );

  assert.doesNotMatch(html, /<script>alert\("title"\)<\/script>/);
  assert.doesNotMatch(html, /<svg onload=alert\(1\)>/);
  assert.match(html, /&lt;script&gt;alert\(&quot;title&quot;\)&lt;\/script&gt;/);
  assert.match(html, /&lt;img src=x onerror=&quot;x&quot;&gt;/);
  assert.match(html, /rel="noopener noreferrer"/);
});

test("source catalog escapes publisher content and uses external-link safeguards", () => {
  const html = renderSourceCatalog([{
    id: "SRC-1",
    title: '<iframe src="javascript:alert(1)">',
    url: "https://example.org/source",
    publisher: "Publisher <script>",
    reviewStatus: "human-review-required",
    supports: ["claim <unsafe>"],
    limitations: ["not <validated>"]
  }]);
  assert.doesNotMatch(html, /<iframe src="javascript:alert\(1\)">/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /&lt;iframe/);
});
