# Design Direction: Route Map

Selected 2026-10-11. Research is in [DESIGN_RESEARCH.md](DESIGN_RESEARCH.md).

## Three directions considered

### A. Route Map (selected)
- **Thesis:** an accommodation is a route from a barrier to participation. VocSpace is the wayfinding system for it.
- **Metaphor:** a transit line. The seven stages are stations, solution options are coloured lines (one colour per mechanism), and the chosen options form your route.
- **Type and composition:** Atkinson Hyperlegible Next (designed by the Braille Institute for low-vision readers) for all text. A left station rail holds a continuous vertical line, with one reading column beside it. Header is a black signage bar.
- **Colour:** warm enamel-paper background and black ink. Line colours appear only where they mean a mechanism.
- **Interaction:** a route strip in the header shows where you are. Options are selected like adding a line to a route. Long lists collapse with `<details>`.
- **References:** Standards Manual, GOV.UK step-by-step, Are.na.
- **Benefits:** orientation is built into the layout, which matters because orientation loss is itself one of the synthetic barrier cases. The metaphor matches routing to resources. The look is distinct from SaaS dashboards.
- **Trade-offs:** transit colours must still pass contrast, so text never sits in a line colour on paper unless that pair is AA. The metaphor must not become decoration.
- **Accessibility:** the linear order matches DOM order. Station markers are decorative, and headings carry the meaning.

### B. Casebook
- **Thesis:** each barrier is a case file and VocSpace is the annotated casebook.
- **Metaphor:** an editorial clinical journal with numbered entries and margin footnotes for sources.
- **Type and composition:** serif display with sans body; single wide column; margin notes.
- **References:** The Pudding, Our World in Data, Cooper Hewitt labels.
- **Benefits:** strong for provenance and reading.
- **Trade-offs:** reads as a publication, so the interactive select → compile flow loses prominence. It also risks feeling clinical, against the "barrier-first, not diagnosis-first" principle.
- **Rejected because** it fits reading better than doing. Its best idea, footnoted provenance, is kept in A.

### C. Instrument
- **Thesis:** VocSpace is a lab instrument for reasoning about fit.
- **Metaphor:** a scientific workbench with split panes, live readouts and a monospace data look.
- **References:** OWID's data explorer, the Paper Mono specimen on recent.design.
- **Benefits:** dense and powerful for professionals.
- **Trade-offs:** high information density and simultaneous panes increase cognitive load, the exact barrier in case 001. Mobile is hard.
- **Rejected because** it serves expert counsellors at the cost of the people whose barriers are being described.

## Design system

### Typography
- Family: `"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", system-ui, "Segoe UI", sans-serif`. Mono: `"Atkinson Hyperlegible Mono", ui-monospace, Consolas, monospace`.
- The fonts are not bundled yet; the stack falls back to the system UI font. To bundle, add the OFL font files under `assets/fonts/` and declare `@font-face`. A CDN is not used, to keep the zero-tracking claim true.
- Scale (rem, root 100%/118.75% in large-text mode): 0.8125 label · 1 body · 1.25 h3 · 1.75 h2 · clamp(2.25–4) display.
- Labels: uppercase, 0.08em tracking, bold, used for station names and metadata only.

### Colour tokens
| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | #f3efe6 | #121212 | page |
| `--ink` | #141414 | #ece8df | text, rules, signage bar |
| `--ink-2` | #4a4740 | #b4afa4 | secondary text (AA on paper) |
| `--rule` | #141414 at 18% | #ece8df at 22% | hairlines |
| `--surface` | #fbf9f4 | #1b1b1b | inputs, document output |
| `--signal` | #c8102e | #ff6b6b | focus ring and primary action |
| `--line-digital` | #0039a6 | #6ea0ff | mechanism: digital / software |
| `--line-environmental` | #00733a | #4cc38a | mechanism: environmental |
| `--line-organizational` | #b34700 | #ff9a52 | mechanism: process / policy |
| `--line-physical` | #6b4a1f | #c99a5b | mechanism: physical / ergonomic |
| `--line-assistive` | #006b6b | #4fd1d1 | mechanism: assistive tech |

High-contrast theme: black field, white text, yellow focus and actions, with line colours swapped for saturated cyan, green, orange and yellow.

### Layout
- Max width 72rem. Grid is a `5rem` station rail plus a content column; the rail collapses to `2.25rem` under 48rem.
- The vertical line runs from the first station to the last. Each section heading carries a station node (a filled circle with its number).
- No rounded containers for content groups. Rows are separated by hairlines. The only filled surfaces are form inputs, the compiled document and notices.

### Components
- **Signage bar:** black header with wordmark, route strip and preference toggles.
- **Route strip:** seven stations as `<ol>`, where each station is a link. The current section is marked with `aria-current="step"`.
- **Option line:** a row with a 6px left rule in the mechanism colour, code and mechanism label, title, mechanism text, effort as 1–3 stops, trade-offs, a `Source:` footnote, and a toggle labelled "Add to route".
- **Route summary:** the functional model drawn as a mini line diagram (Goal → Task → Context → Barrier → Need).
- **Document:** compiled artifacts on a paper surface with tabs that follow the ARIA tabs pattern (arrow keys, roving tabindex).
- **Catalogue row:** pattern code, title and review stamp, expanding via `<details>`.

### Motion
- Only state transitions: focus, selection, and station highlight. Smooth scroll is turned off under `prefers-reduced-motion`.

### Accessibility requirements
- WCAG 2.2 AA minimum: 4.5:1 for text, 3:1 for line colours against paper (used as non-text indicators).
- Focus is visible everywhere as a 3px `--signal` outline with offset.
- Focus is kept when the app re-renders after a preference toggle.
- Live region announces selection count and compile results.
- No emoji as labels. Icons, where present, are `aria-hidden` with text beside them.
