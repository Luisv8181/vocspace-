# VocSpace MVP Roadmap

## Phase 0 — Foundation

- [x] Establish product thesis
- [x] Establish barrier-first architecture
- [x] Establish resource/provenance model
- [x] Decide public/private repository strategy
- [x] Choose initial web stack (Vanilla ES Modules + Accessible CSS custom properties)
- [x] Define data schema (BarrierCase, AccommodationPattern, ResourceCategory, ActionPlan)
- [x] Create comprehensive synthetic case fixtures (8 multi-domain scenarios)
- [x] Expand accommodation patterns (16 vetted patterns across sensory, motor, cognitive, fatigue)

## Phase 1 — Barrier Explorer

User enters a real-world accessibility/accommodation problem.

- [x] Interactive Barrier Intake & Disentanglement (Curated scenarios + Freeform dynamic analysis)
- [x] Functional model generator (Goal, Task, Context, Barrier, Functional Need, Strengths, Constraints)
- [x] Clarifying inquiry generator to isolate barrier mechanisms
- [x] Objective functional need synthesis (decoupled from medical/diagnostic labels)
- [x] Domain keyword classifier (Cognitive, Sensory Vision/Audio, Motor, Fatigue, Communication)

*Success criterion:* Reframes requests around function and environmental friction rather than diagnosis.

## Phase 2 — Solution Explorer

For each functional need:
- [x] Side-by-side multi-pathway comparison (Digital, Environmental, Process/Policy, Physical, Assistive Tech)
- [x] Explicit mechanism and rationale documentation
- [x] Known tradeoffs and failure-mode warnings
- [x] Evidence and provenance citations (JAN, OSHA, W3C, RESNA, EEOC)
- [x] Implementation complexity rating (Low, Medium, High effort)
- [x] Multi-selection capability for comprehensive action plans

*Success criterion:* Users compare alternative solution pathways rather than receiving a single opaque AI answer.

## Phase 3 — Resource Router

Capability-tagged resource registry matching cases to domain specialists:
- [x] JAN (Job Accommodation Network & SOAR)
- [x] TechA11y (Web accessibility remediation & auditing)
- [x] W3C WAI (WCAG 2.2 standards & COGA guidelines)
- [x] EEOC (ADA Title I legal interactive process standards)
- [x] RESNA (Rehabilitation Engineering & Assistive Technology)
- [x] State Vocational Rehabilitation (Funding, IPE, job coaching)
- [x] CAST / UDL Guidelines (Universal Design for Learning)
- [x] Assistive Technology Makerspaces (Low-cost physical adaptations)
- [x] IAAP (Certified accessibility professionals)
- [x] Developers & AI Coding Agents (Rapid software adaptation)

*Success criterion:* Cases route to resources based on capability metadata, not static advertising directories.

## Phase 4 — Solution Compiler

Turn selected solution pathways into 4 production-grade actionable artifacts:
- [x] **Formal Accommodation Request Letter:** ADA Title I / JAN compliant language framing functional limitations without exposing private diagnostic records.
- [x] **Technical Implementation Spec & AI Coding Agent Prompt:** Copyable prompt for Claude, GPT, Antigravity, or engineering teams enforcing WCAG 2.2 AA/AAA, ARIA landmarks, and keyboard traps.
- [x] **Workplace Implementation & Safety Checklist:** 4-phase execution checklist (Alignment, Procurement, Setup, Safety Review).
- [x] **Longitudinal Outcome Validation Protocol:** Baseline vs. Day 30/60 metric comparison table, qualitative reflection prompts, and disposition decision matrix.
- [x] In-browser copy-to-clipboard and text file download actions.

*Success criterion:* The user leaves with concrete, immediately actionable documents.

## Phase 5 — Validation

Outcome measurement and systematic feedback:
- [x] Baseline vs follow-up quantitative metrics tracking
- [x] Evaluation of secondary friction or unexpected barriers
- [x] Systematic disposition rubric: Validated/Permanent, Iterative Refinement, or Pathway Pivot
- [ ] Longitudinal outcome database and anonymized pattern graph (Server/Backend milestone)

## Phase 6 — Network

Future expansion:
- person ↔ employer
- person ↔ provider
- organization ↔ accessibility specialist
- organization ↔ developer
- resource ↔ resource
