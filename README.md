# VocSpace

> Turn accessibility and accommodation needs into actionable solutions.

VocSpace is an open-source exploration of accessibility and accommodation intelligence.

The core model is:

**Barrier → Functional Need → Options → Solution → Connection → Implementation → Validation**

VocSpace is designed to help people and organizations understand barriers, discover credible solution pathways, connect with relevant resources and specialists, and turn selected solutions into actionable implementation plans.

## Why VocSpace?

Most accommodation systems begin with a requested solution.

VocSpace begins with the **barrier**.

A person should be able to explain what they are trying to do, what is getting in the way, and what context they are operating in. The system can then help identify the functional need and compare possible interventions.

## Ecosystem, not isolation

VocSpace does not need to build every accessibility solution.

It can route users to specialized resources when appropriate, including accommodation guidance, accessibility remediation platforms, standards, assistive technology providers, vocational rehabilitation resources, developers, and accessibility professionals.

For example, a web accessibility case might be routed to a specialist such as [TechA11y](https://techa11y.dev/) when its capabilities fit the problem.

## Architecture

See:
- [Product Vision](docs/PRODUCT_VISION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Resource Ecosystem](docs/RESOURCE_ECOSYSTEM.md)
- [MVP Roadmap](docs/MVP_ROADMAP.md)

## Status

Early architecture and discovery. The first implementation uses synthetic/demo cases and focuses on the barrier-to-solution workflow before adding sensitive case management or automated employer integrations.

## Design principles

- Barrier-first, not diagnosis-first
- Multiple solution pathways, not one opaque recommendation
- Source and provenance for every recommendation
- Human judgment remains central
- Privacy by design
- Accessibility by default
- Learn from outcomes, not just recommendations

## Transparent solution matching

The prototype includes a deterministic, inspectable baseline matcher. It uses lexical/context overlap to rank draft accommodation patterns, returns explanations and matched terms, and routes patterns to resource categories. It includes a narrow guard for explicitly negated pattern needs, but this is not natural-language understanding. The matcher remains a prototype heuristic, not a validated recommendation model. Review [Solution Matching](docs/SOLUTION-MATCHING.md).

Run:
- `npm run validate` for syntax, domain, matching, and rendering-safety checks.
- `npm run test:matching` for matching scenarios.
- `npm run test:rendering` for HTML escaping and link-rendering checks.

## Agent handoff: solution matching

The functional-model matcher and action-plan schema live in `src/domain/solution-matcher.js` and `src/domain/action-plan.js`. The baseline is not a validated recommendation model. The next priority is to evaluate relevance with qualified reviewers and user input before adding generative AI or sensitive case management.

## Source catalog

The prototype includes a compact catalog of official JAN pages for discovery and future human review. Pattern-to-source mappings are provisional: patterns remain draft and have not been upgraded to evidence-validated status. See [Source Catalog and Pattern Mapping](docs/SOURCE-CATALOG-AND-PATTERN-MAPPING.md) and [Evidence and Source Provenance](docs/EVIDENCE-AND-SOURCE-PROVENANCE.md).

## Accessibility QA

The repo now includes a repeatable [Accessibility QA Checklist](docs/ACCESSIBILITY-QA-CHECKLIST.md) for keyboard, screen-reader, responsive, visual, and functional testing. Automated rendering tests are not a substitute for manual testing. Do not describe the prototype as accessibility-tested until actual browser and assistive-technology results have been recorded.
