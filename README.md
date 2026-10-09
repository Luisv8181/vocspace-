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

Early architecture and discovery. The first implementation will use synthetic/demo cases and focus on the barrier-to-solution workflow before adding sensitive case management or automated employer integrations.

## Design principles

- Barrier-first, not diagnosis-first
- Multiple solution pathways, not one opaque recommendation
- Source and provenance for every recommendation
- Human judgment remains central
- Privacy by design
- Accessibility by default
- Learn from outcomes, not just recommendations

## Transparent solution matching

The prototype includes a deterministic, inspectable baseline matcher. It uses lexical/context overlap to rank draft accommodation patterns, returns explanations and matched terms, and routes patterns to resource categories. It is a prototype heuristic, not a validated recommendation model. Review [Solution Matching](docs/SOLUTION-MATCHING.md). Run `npm run validate`.
