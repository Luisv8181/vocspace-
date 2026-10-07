# Accommodation Foundry Architecture

## Mission

The Accommodation Foundry is the research and prototyping layer of VocSpace.

It connects a person-centered functional analysis to candidate digital, physical, hybrid, and simulated solutions.

The foundational pipeline is:

**Need → Barrier → Functional Model → Design Space → Simulation → Prototype → Test → Outcome**

## 1. Functional Model

Every Foundry project starts with a structured representation of the situation.

### Required concepts

- Participation goal
- Task
- Environment
- Functional demand
- Barrier
- Existing strengths
- Existing strategies
- Constraints
- Desired outcome

The system should avoid treating a diagnosis as the design specification. Diagnosis can be relevant context, but the design target is the functional barrier and participation goal.

## 2. Design Space

Instead of generating one answer, VocSpace should generate multiple candidate intervention patterns.

Candidate categories:

- Environmental change
- Task modification
- Tool modification
- Digital interface change
- Communication change
- Sensory adaptation
- Cognitive support
- Physical support
- Alternative input
- Alternative output
- Automation
- Training or strategy
- Hybrid technology

Each candidate records its rationale, assumptions, tradeoffs, dependencies, and implementation path.

## 3. Simulation Layer

The simulation layer explores whether a concept is plausible before fabrication or deployment.

Possible engines and tools:

- Blender
- CAD
- Physics engines
- Computer vision
- Procedural geometry
- Interaction simulation
- Digital twins
- Virtual work environments

Simulation outputs should be treated as evidence about a model under stated assumptions, not as proof of real-world performance.

## 4. Prototype Layer

Prototype targets include:

### Digital
- HTML/CSS/JS prototypes
- React components
- Accessible interaction patterns
- Browser demos
- Assistive interaction experiments

### Physical
- CAD models
- 3D-printable parts
- Assembly instructions
- Dimensioned drawings
- Material specifications

### Embedded / Hybrid
- ESP32 firmware
- Sensor prototypes
- Actuator concepts
- Computer-vision interfaces
- Control mappings

## 5. Test Layer

Testing should measure the intended function.

Possible measures:

- Task completion
- Time on task
- Error rate
- Assistance required
- Reach or force requirements
- Cognitive load indicators
- User preference
- Accessibility criteria
- Reliability
- Comfort
- Environmental fit

The exact test should be chosen based on the intervention.

## 6. Outcome Layer

A recommendation is not considered successful because it was generated.

VocSpace should capture:

- Intended outcome
- Observed outcome
- What improved
- What failed
- Unexpected effects
- User feedback
- Context changes
- Revision decision

This creates a learning loop:

**Design → Test → Learn → Redesign**

## 7. Agent Handoff

Foundry projects should generate machine-readable and human-readable handoff artifacts.

Potential artifacts:

- `problem.md`
- `functional-model.json`
- `design-options.json`
- `simulation-plan.md`
- `prototype-spec.md`
- `validation-plan.md`
- `acceptance-tests.md`
- `safety-review.md`
- `agent-instructions.md`

Coding and fabrication agents should receive explicit constraints and acceptance criteria rather than only natural-language descriptions.

## 8. Evidence and Provenance

Every significant design decision should be traceable.

Record:

- Source
- Source type
- Claim
- Design implication
- Confidence
- Applicability assumptions
- Human decision
- Implementation result
- Validation result

Distinguish clearly between:

**Source fact → System inference → Design suggestion → Human decision → Test result**

## 9. Safety State Machine

A Foundry artifact should have an explicit maturity state:

1. Idea
2. Concept
3. Simulated
4. Prototype
5. Bench Tested
6. User Tested
7. Validated for Defined Context
8. Production Candidate

Promotion between states requires evidence appropriate to the artifact.

Some artifacts should never advance without external professional review.

## 10. High-Risk Boundary

Foundry tooling must flag projects involving:

- Load-bearing structures
- Mobility or transfer equipment
- Medical devices
- Electrical safety
- High forces or stored energy
- Skin-contact risks
- Fire or heat
- Clinical intervention
- Safety-critical automation

AI-generated designs in these areas require appropriate human engineering, clinical, regulatory, or other qualified review.

## 11. Long-Term Technical Shape

A future implementation may contain:

- Web application
- Functional-domain ontology
- Accommodation pattern library
- Resource graph
- CAD/prototype asset store
- Simulation orchestration layer
- Test harness
- Outcome database
- Agent handoff system
- Provenance ledger

The system should be modular so that new design tools can be added without changing the core functional model.

## Architectural Principle

**VocSpace should be able to move from a lived barrier to a testable accommodation without losing the human reasoning that connects the two.**