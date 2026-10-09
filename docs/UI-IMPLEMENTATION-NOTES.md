# Barrier Explorer UI Implementation Notes

## Current prototype

The static frontend loads domain objects from local ES modules and supports:

- Three synthetic barrier cases
- Functional model summary
- Multiple solution cards per case
- Selecting one or more candidate solutions
- Draft action plan generation
- Accommodation pattern browsing
- Capability-based resource categories

## Run locally

Use any static web server that serves ES modules correctly from the repository root. For example, with Node installed:

```sh
npx serve .
```

No backend or external API is required for the demo.

## Important limitations

- No personal data should be entered; these are fixed synthetic examples.
- This is a prototype, not a professional decision system.
- Pattern provenance is draft VocSpace synthesis, not evidence validation.
- Resource records need verified URLs, appropriate attribution, and current source review before public launch.
- Further accessibility testing with keyboard-only navigation, screen readers, zoom/reflow, and mobile devices is required.
