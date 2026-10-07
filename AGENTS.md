# VocSpace Coding Agent Instructions

This file is the operating contract for future coding agents working in the VocSpace repository.

## Mission

VocSpace explores how Clinical Rehabilitation Counseling, accessibility, human-centered AI, assistive technology, digital design, physical prototyping, simulation, and vocational innovation can work together.

Do not reduce VocSpace to a generic accommodation-request application.

The long-term loop is:

**Need → Understand → Design → Simulate → Build → Test → Adapt**

## Read Before You Build

Before making substantial changes, read:

1. `README.md`
2. `GUIDING_LIGHT/00-NORTH-STAR.md`
3. `GUIDING_LIGHT/01-VISION.md`
4. `GUIDING_LIGHT/02-AI-ACCOMMODATION-LAB.md`
5. `GUIDING_LIGHT/08-ACCOMMODATION-FOUNDRY.md`
6. `docs/ARCHITECTURE.md`
7. `docs/FOUNDRY_ARCHITECTURE.md`
8. `docs/FOUNDRY_AGENT_PROTOCOL.md`
9. `docs/FOUNDRY_ARTIFACTS.md`

Read the smallest additional set of files needed for the task.

## Core Product Model

Start from the person's goal and functional barrier.

Use:

**Participation Goal → Task → Context → Functional Demand → Barrier → Functional Need → Options → Solution → Implementation → Validation**

Do not start with a diagnosis and work backwards to a predetermined device or accommodation.

A diagnosis may be relevant context, but the design target is the functional experience and participation goal.

## Agent Roles

Different agents may specialize in:

- Product architecture
- Frontend and interaction design
- Accessibility
- Backend/data
- AI and prompt systems
- Research and evidence
- Vocational rehabilitation
- CAD and 3D modeling
- Physics simulation
- Embedded systems and sensors
- Computer vision
- Robotics
- Testing and evaluation
- Documentation

Specialization is encouraged. Fragmentation is not.

Every agent must leave artifacts understandable to the next agent.

## Before Coding

For any non-trivial task, establish:

- What user or workflow is being served
- What barrier or problem is being addressed
- What artifact will change
- What must remain unchanged
- Constraints
- Acceptance criteria
- Risk level
- Evidence or source requirements

Do not invent critical clinical, legal, safety, or user facts.

If a necessary fact is unknown, represent the uncertainty explicitly.

## Build Multiple Options

When designing an accommodation, do not assume the first plausible solution is the best solution.

Where reasonable, generate multiple intervention patterns and compare:

- Fit to functional need
- User control
- Context fit
- Cost
- Complexity
- Durability
- Accessibility
- Maintainability
- Risks
- Dependencies
- Reversibility

Prefer solutions that preserve user agency.

## Digital Work

Digital accessibility work should consider:

- Keyboard access
- Focus behavior
- Semantic structure
- Screen-reader behavior
- Text scaling
- Contrast
- Motion preferences
- Cognitive load
- Information density
- Error recovery
- Alternative input and output
- Multilingual access

Do not call an interface accessible merely because it passes a superficial automated check.

Use appropriate standards and real interaction testing.

## Physical / CAD Work

Physical designs may use:

- Blender
- CAD
- Parametric geometry
- 3D printing
- Sensors
- Embedded controllers
- Computer vision
- Robotics

Preserve dimensions, assumptions, materials, tolerances, and intended use.

Simulation is evidence about a model under stated assumptions. It is not proof of real-world safety or effectiveness.

## Simulation Work

When simulating:

1. Define the question.
2. Define the model.
3. Record assumptions.
4. Define parameters.
5. Define scenarios.
6. Run the simulation.
7. Record outputs.
8. Describe limitations.
9. Identify what must still be tested in the real world.

Do not convert a simulation result into an unsupported safety claim.

## High-Risk Work

Escalate to qualified human review for projects involving:

- Load-bearing equipment
- Mobility or transfer systems
- Medical devices
- Electrical hazards
- High forces or stored energy
- Fire or heat
- Skin-contact risks
- Clinical intervention
- Safety-critical automation
- Legal or regulatory determinations

AI agents may assist with analysis and implementation but do not independently certify safety, medical necessity, disability status, legal entitlement, fitness for duty, or regulatory compliance.

## Evidence and Provenance

For meaningful design or research decisions, preserve:

**Source fact → System inference → Design suggestion → Human decision → Test result**

Whenever external evidence informs a decision, record the source and what claim it supports.

Do not present model-generated inference as if it were a sourced fact.

## Privacy

Use synthetic or de-identified data for development whenever possible.

Do not place unnecessary protected, identifying, or sensitive information into code, test fixtures, prompts, commits, logs, or issue comments.

## Testing

Every meaningful implementation should have explicit acceptance criteria.

Tests may cover:

- Functional behavior
- Accessibility
- Usability
- Reliability
- Performance
- Geometry
- Sensor behavior
- Simulation assumptions
- Safety gates
- Outcome measures

A prototype is not automatically a validated intervention.

## Failure Is Data

Do not hide failed experiments.

Record:

- Expected behavior
- Observed behavior
- Failure mode
- Likely cause
- What changed
- Next experiment

Preserving negative results prevents future agents from repeating the same mistake.

## Agent Handoff Protocol

End significant work with:

### Current State
What exists now.

### Completed
What this agent changed.

### Remaining
What still needs to be done.

### Risks
What could break, mislead, or create unsafe assumptions.

### Next Experiment
The smallest useful next step.

## Change Discipline

Keep changes modular.

Prefer small, reviewable commits with clear messages.

Do not silently refactor unrelated systems.

Do not delete established concepts merely because a new architecture is being introduced. Preserve useful history and explain intentional deprecations.

## Architecture Before Complexity

Do not build the entire future platform at once.

Start with the smallest artifact that proves the next concept.

Favor composable schemas, components, protocols, and interfaces that can later support:

- Web applications
- Accessibility tools
- Accommodation pattern libraries
- Resource graphs
- CAD assets
- Simulation
- Prototyping
- Testing
- Outcome tracking
- Agent orchestration

## Open-Source Research Mindset

Treat the repository as both software and research infrastructure.

Useful artifacts include:

- Synthetic cases
- Accommodation recipes
- Design patterns
- Accessibility experiments
- Simulation studies
- Prototype specifications
- Validation protocols
- Benchmarks
- Research notes
- Reproducible examples
- Agent prompts

## Definition of Done

A task is not complete merely because code runs.

A strong completion means:

1. The implementation addresses the intended problem.
2. The relevant accessibility requirements were considered.
3. Assumptions are visible.
4. Tests or acceptance criteria exist.
5. Provenance is preserved where appropriate.
6. Risks are documented.
7. Another agent can continue from the current state.
