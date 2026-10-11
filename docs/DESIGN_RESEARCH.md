# Design Research

Research for the VocSpace UI redesign (2026-10-11). Every reference below was opened and inspected in a browser session. Observations are separated from interpretation.

## Product framing

- **Product:** a barrier-first accommodation reasoning tool. A person moves along a fixed chain: Barrier → Functional Need → Options → Solution → Connection → Implementation → Validation.
- **Audience:** workers, students, rehabilitation counselors, accessibility professionals, employers. Many users will be disabled, so legibility, orientation and low cognitive load are the product, not polish.
- **Emotional tone:** calm, trustworthy, practical. Not clinical, not "AI magic".
- **Baseline (v0.2):** dark rounded hero, centered headline, emoji-prefixed buttons, one rounded card style for every content type, five stacked panels with no orientation aid. Functional, but interchangeable with any generated SaaS page.

## References

### 1. Standards Manual: https://standardsmanual.com/
Publisher of reissued transit and agency graphics manuals (NYCTA, NASA).
- **Observed:** solid black top bar; heavy, tight, lowercase grotesk nav; a single red accent for calls to action; flat geometric colour with no gradients or shadows.
- **Interpretation:** transit graphics achieve authority through a strict system (one typeface, a fixed colour per line, black field) rather than ornament.
- **Applies to VocSpace:** a black signage bar for the header; a fixed colour per intervention mechanism used consistently, like route colours.

### 2. GOV.UK Design System, step-by-step navigation: https://design-system.service.gov.uk/patterns/step-by-step-navigation/
- **Observed:** numbered circles joined by a vertical line; each step has a bold heading, a show/hide control and links beneath. The cookie banner offers an equal-weight "Reject analytics cookies" button.
- **Interpretation:** the spine-plus-numbered-node pattern is a tested way to show an end-to-end journey to a general public, including people with cognitive disabilities.
- **Applies:** the page itself becomes a step-by-step spine. Each VocSpace section is a numbered station on a continuous vertical line.

### 3. Cooper Hewitt, Smithsonian Design Museum: https://www.cooperhewitt.org/
- **Observed:** navigation laid out as a grid of uppercase condensed labels, each with a hairline rule above it; secondary actions in orange in a separate row; caption text placed as label strips on images.
- **Interpretation:** museum labels give each object a short, consistent block of metadata. A hairline above a label is enough structure; no box is needed.
- **Applies:** the resource directory and pattern catalogue use hairline-ruled rows with label-style metadata instead of rounded cards.

### 4. The Pudding: https://pudding.cool/
Visual-essay publication.
- **Observed:** every story is tagged with an issue number (`#225`) and a date on one metadata line above a large, bold lowercase title and a one-line deck.
- **Interpretation:** a stable code plus a short title makes a large collection scannable and citable.
- **Applies:** pattern IDs (`AP-001`) and case codes become prominent route codes, as with issue numbers, instead of small grey badges.

### 5. Our World in Data, chart page: https://ourworldindata.org/grapher/life-expectancy
- **Observed:** every chart carries a "Data source:" line; a "Data sources" section separates "the citation of the original data obtained from the source, prior to any processing" from the processing notes. Headings in a serif; body in a sans. The cookie banner has an equal-weight reject option.
- **Interpretation:** trust comes from showing where a claim came from, and from keeping source and processing visibly separate.
- **Applies:** VocSpace's own rule is "Source fact → System inference → Design suggestion". Evidence becomes a "Source:" footnote line on each option, and draft (synthesis) patterns are visibly marked apart from source-reviewed ones.

### 6. Are.na, About: https://www.are.na/about
- **Observed:** a narrow left column holds a breadcrumb label ("Are.na / About"); a single readable text column sits to its right. "How it works" is a vertical list (Capture, Arrange, Search) with a dot on the active item and the others dimmed.
- **Interpretation:** a label rail plus one reading column keeps long pages calm.
- **Applies:** a left station rail holding step labels, with one main content column.

### 7. Microsoft Inclusive Design: https://inclusive.microsoft.design/
In-industry reference.
- **Observed:** the skip link is the first focusable element and becomes visible on focus; light/dark mode and grid view are persistent header controls with plain-word labels; line-drawn illustrations of people and tools.
- **Interpretation:** preference controls are first-class navigation, not a hidden settings page.
- **Applies:** theme and text-size controls stay in the header, labelled in words (no emoji) and exposed as pressed/unpressed toggle groups.

### 8. Galleries (limited)
- https://godly.website/ redirected to https://recent.design/ and showed an image feed of posters and type specimens (e.g. a "Paper Mono" type specimen). It was useful for mood, but there was no inspectable product UI relevant here.
- https://www.siteinspire.com/websites showed mostly unloaded thumbnails in this browser session.
- https://www.awwwards.com/websites/?text=accessibility returned studio names only through text extraction.
- **Limitation:** these galleries were opened but did not give enough inspectable detail to base design decisions on. The decisions above rest on references 1–7.

Outside the product's industry: 1, 3, 4, 5 and 6. In or adjacent to the industry: 2 and 7.

## Transferable principles

1. **A journey should look like a journey.** Use a continuous line with numbered stations (2, 6), not stacked boxes.
2. **One fixed colour per category, used everywhere** (1). Mechanism colours act as route colours.
3. **Codes before titles** (4). IDs make items citable in counselling notes and agent handoffs.
4. **Show provenance at the point of the claim** (5).
5. **Hairlines over boxes** (3, 6). Use structure, not containers.
6. **Preferences as visible first-class controls** (7).
