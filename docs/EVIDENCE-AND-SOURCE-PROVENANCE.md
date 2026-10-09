# Evidence and Source Provenance Policy

## Purpose

VocSpace may learn from public accommodation guidance, accessibility standards, assistive-technology resources, research literature, and practitioner knowledge. The source library must preserve attribution and must not misrepresent original source material.

## JAN as a knowledge source

The Job Accommodation Network (JAN) is a potentially valuable source of workplace accommodation information. VocSpace should use JAN as a source to consult and link to, subject to the source's applicable copyright, licensing, access, and use terms.

Do not bulk-copy, scrape, republish, or train on JAN content without confirming that the intended use is permitted. A public webpage is not automatically public-domain material.

Preferred approach:

1. Link users to the relevant JAN page.
2. Record source title, URL, retrieval date, and applicable use notes.
3. Capture only the minimum source metadata permitted and needed for discovery.
4. Write VocSpace's own generalized functional patterns and implementation scaffolds.
5. Keep source-derived claims distinguishable from original VocSpace synthesis.
6. Have a human review any extracted or summarized guidance before production use.

## Source record fields

Recommended fields:

- `sourceId`
- `title`
- `publisher`
- `url`
- `sourceType` (official guidance, standard, research, product documentation, practitioner resource)
- `retrievedAt`
- `licenseOrUseNotes`
- `claimsSupported`
- `reviewStatus`
- `reviewedBy`
- `lastReviewedAt`

Do not fabricate missing source information. Unknown fields should remain explicitly unknown.

## Provenance labels

Every important recommendation should indicate one or more of these classes:

- **Source-supported statement:** supported by an identified source.
- **VocSpace synthesis:** generalized reasoning authored by VocSpace.
- **AI-generated hypothesis:** a proposed idea requiring review.
- **Professional judgment:** supplied or approved by a qualified person.
- **Test result:** observed during a documented evaluation.

Do not label a pattern as evidence-based until the underlying evidence has been identified and assessed.

## Evidence quality

A citation alone does not establish that an intervention works for every person or context. Record applicability, limitations, conflicting findings, and whether the claim concerns legal guidance, technical conformance, clinical effects, feasibility, or user preference.

## Maintenance

- Recheck high-impact and time-sensitive sources periodically.
- Track changed URLs and withdrawn resources.
- Preserve source versions or dates where legally and technically appropriate.
- Provide a correction pathway when a source or summary is inaccurate.
- Prefer direct sources over unsourced summaries.
