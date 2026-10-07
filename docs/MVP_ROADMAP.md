# VocSpace MVP Roadmap

## Phase 0 — Foundation

- [x] Establish product thesis
- [x] Establish barrier-first architecture
- [x] Establish resource/provenance model
- [ ] Decide public/private repository strategy
- [ ] Choose initial web stack
- [ ] Define data schema
- [ ] Create synthetic case fixtures

## Phase 1 — Barrier Explorer

User enters a real-world accessibility/accommodation problem.

Output:
- barrier summary
- task being blocked
- functional need
- clarifying questions
- potential intervention categories

Success criterion: the system reframes the request around function rather than diagnosis or a predetermined accommodation.

## Phase 2 — Solution Explorer

For each functional need:
- show multiple intervention patterns
- explain tradeoffs
- show evidence/source
- identify implementation complexity
- identify relevant resources

Success criterion: users can compare solution pathways rather than receiving one opaque AI answer.

## Phase 3 — Resource Router

Create a searchable resource registry with capability metadata.

Initial seeded resources:
- JAN
- TechA11y
- WCAG
- EEOC/ADA resources
- selected assistive technology resources

Success criterion: a case can be routed to a resource because of its capability, not simply because it appears in a directory.

## Phase 4 — Solution Compiler

Turn a selected solution into reusable outputs:
- accommodation/request language
- implementation checklist
- stakeholder communication
- technical specification
- coding-agent prompt when appropriate
- validation checklist

Success criterion: the user leaves with something actionable.

## Phase 5 — Validation

After implementation:
- what changed?
- did the barrier decrease?
- what remains?
- was an alternative solution attempted?
- what worked?

This creates the foundation for an outcome-informed accommodation knowledge graph.

## Phase 6 — Network

Later:
- person ↔ employer
- person ↔ provider
- organization ↔ accessibility specialist
- organization ↔ developer
- resource ↔ resource

Do not build the network before proving that the intelligence/routing layer provides value.
