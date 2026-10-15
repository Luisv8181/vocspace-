# Barrier Explorer UI Implementation Notes

## Current prototype

The static frontend loads domain objects from local ES modules. It follows the **Route Map** direction: see [DESIGN_DIRECTION.md](DESIGN_DIRECTION.md), with research in [DESIGN_RESEARCH.md](DESIGN_RESEARCH.md).

The page is one line with five stations and an appendix:

1. **Barrier.** Choose one of 8 synthetic cases or describe your own; edit the functional model.
2. **Need.** The route summary (Goal → Task → Context → Barrier → Functional need), plus clarifying questions for custom barriers.
3. **Options.** Solution options coloured by mechanism. "Add to route" selects them, and a sticky bar shows the count.
4. **Connect.** Resources matched by capability to the options on the route.
5. **Plan.** Four compiled drafts in an ARIA tabs widget: request letter, technical spec, checklist, validation protocol.
- **Appendix.** The pattern catalogue as collapsible rows with review stamps.

Header preferences: theme (light / dark / high contrast) and text size (standard / large). The initial theme follows `prefers-color-scheme` and `prefers-contrast`. Choices are saved in `localStorage` when it is available.

## Run locally

Use any static web server that serves ES modules correctly from the repository root. For example, with Node installed:

```sh
npx serve .
```

No backend or external API is required for the demo.

## Validation (2026-10-11)

Checked in a real browser (Chromium, Claude desktop browser pane) against the local server:

- **Flow.** Case selection, selecting 2 options, building the plan (4 drafts, focus moves to the first tab, live-region announcement), and resource matching (3 on route). The custom barrier analysis produced 4 options and 2 clarifying questions.
- **Keyboard.** Document tabs support Arrow keys and Home/End with roving tabindex, and the correct panel shows. Theme toggles keep focus after the app re-renders. Focus rings are visible on paper and on the black header.
- **Themes.** Light, dark and high contrast were inspected visually.
- **Responsive.** Checked at about 1009px and at 375px with large text and high contrast. There is no horizontal page scroll at 375px (`scrollWidth` equals `clientWidth`).
- **Contrast.** Computed for every text token against paper and surface in light and dark. All are ≥ 4.79:1; the lowest is the process/policy orange on light paper.
- **Tests.** `npm test` passes: domain validation, engine tests and syntax check.

Not yet verified:

- Screen readers (NVDA, VoiceOver) were not tested; only the DOM semantics were reviewed.
- Windows High Contrast / `forced-colors` has rules but was not checked visually.
- 200% and 400% browser zoom and reflow were not checked.
- Safari and Firefox were not checked. `:has()` and `color-mix()` need current versions; older browsers lose only the selected-row tint and toggle inversion, and the checkbox state remains.
- Atkinson Hyperlegible Mono is not bundled; code blocks use the system monospace.

## Important limitations

- No personal data should be entered; these are fixed synthetic examples.
- This is a prototype, not a professional decision system.
- Pattern provenance is draft VocSpace synthesis, not evidence validation.
- Resource records need verified URLs, appropriate attribution, and current source review before public launch.
- Editing a curated case changes the in-memory case for the session only.
