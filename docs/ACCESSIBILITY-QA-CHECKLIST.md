# Accessibility QA Checklist

This checklist is a planned manual test protocol. Items must not be marked passed until a person performs and records the test against a specific build and browser/assistive-technology combination.

## Build and test record

- Tested commit:
- Date:
- Tester:
- Browser and version:
- Operating system:
- Screen reader and version (if used):
- Viewport / zoom:
- Result: Not tested / Pass / Fail / Blocked
- Notes and issue links:

## Keyboard-only pass

- [ ] Start at the top of the page and reach every interactive control using Tab and Shift+Tab.
- [ ] Focus order follows the page's reading and task sequence.
- [ ] Every focused control has a visible focus indicator that is not clipped or obscured.
- [ ] The case selector, text areas, checkboxes, and action-plan button work without a pointer.
- [ ] Space toggles checkboxes; Enter or Space activates buttons as expected.
- [ ] No keyboard trap occurs; users can leave every component.
- [ ] After updating a functional model, keyboard focus remains understandable and is not unexpectedly lost.
- [ ] Newly rendered pattern cards and their controls are reachable in a predictable order.
- [ ] External source links are clearly identifiable and their new-tab behavior is disclosed or behaves as expected.

## Screen-reader and semantics pass

- [ ] Page title and section headings expose a meaningful outline.
- [ ] Every form control has a programmatic label.
- [ ] Required fields are announced and errors can be found, understood, and corrected.
- [ ] Checkbox labels identify which option is being selected.
- [ ] Match explanations distinguish a lexical match from a validated recommendation.
- [ ] Status updates after model refresh are announced without unnecessarily repeating the whole page.
- [ ] Empty/no-match and insufficient-context states are announced.
- [ ] Action-plan results are announced when created, including validation measures and cautions.
- [ ] Links have meaningful accessible names and source destinations are understandable.
- [ ] Reading and focus order remain usable after custom-barrier mode hides preset options.

## Visual and responsive pass

- [ ] Text can be zoomed to 200% without loss of content or functionality.
- [ ] At narrow mobile widths, content reflows without horizontal page scrolling.
- [ ] Text and controls have sufficient contrast; evaluate normal text, large text, borders, focus indicators, and states.
- [ ] Focus is visible in both ordinary and high-contrast/forced-color settings.
- [ ] Layout remains usable with increased text spacing.
- [ ] Reduced-motion preferences are respected.
- [ ] Hidden preset option cards cannot be reached by keyboard or screen reader.

## Functional safety and usability pass

- [ ] User-entered HTML-like strings display as text and do not execute.
- [ ] Explicitly negated support terms are not treated as positive evidence of need.
- [ ] Switching to custom-barrier mode does not allow preset case solutions into the draft plan.
- [ ] No selected option means no action plan is silently created.
- [ ] Source discovery links open the intended publisher, and provenance still says human review is required.
- [ ] Test with varied language, short input, typos, synonyms, contradictory input, and unrelated goals.
- [ ] Confirm the interface does not imply a legal, medical, eligibility, or engineering safety determination.

## Exit criteria

Do not call the prototype accessibility-tested until the keyboard, screen-reader, visual, and functional sections have been completed by testers and the build/browser/assistive-technology versions are recorded. Automated tests supplement, but do not replace, manual accessibility evaluation.
