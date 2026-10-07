# Accommodation Foundry Artifacts

This document defines the artifacts that future VocSpace agents should create and maintain.

## Project Record

A Foundry project should have one canonical project record containing:

- Project ID
- Participation goal
- Task
- Environment
- Barrier
- Functional need
- Constraints
- Stakeholders
- Risk level
- Current maturity state
- Current intervention
- Validation status

## Functional Model

A machine-readable model describing the problem independently of any particular technology.

Example shape:

```json
{
  "goal": "...",
  "task": "...",
  "environment": "...",
  "barrier": "...",
  "functional_need": "...",
  "constraints": [],
  "success_criteria": []
}
```

## Design Option

Every candidate solution should document:

- Name
- Type
- Barrier addressed
- Mechanism
- Assumptions
- Advantages
- Tradeoffs
- Cost
- Dependencies
- Risks
- Evidence
- Implementation pathway

## Prototype Package

A prototype package may include:

- Source code
- CAD
- Blender scene
- Generated mesh
- 3D-print file
- Wiring diagram
- Bill of materials
- Assembly instructions
- Firmware
- User instructions

## Simulation Package

A simulation package should record:

- Model
- Inputs
- Assumptions
- Parameters
- Environment
- Scenarios
- Expected outputs
- Observed outputs
- Limitations

## Validation Package

A validation package should include:

- Success criteria
- Test protocol
- Test environment
- Participants or test method
- Measurements
- Results
- Failures
- User feedback
- Revision decision

## Agent Handoff

Agent instructions should state:

1. What problem is being solved.
2. What must remain unchanged.
3. What artifact must be produced.
4. What constraints apply.
5. What evidence should be preserved.
6. How success will be tested.
7. What conditions require escalation to a human expert.

## Reproducibility

A project should be reproducible whenever practical.

Record:

- Tool versions
- Model versions
- Prompt or instruction version
- Input files
- Source data
- Parameters
- Generated artifacts
- Test results

## Human-in-the-Loop

The system should make human decisions visible.

A generated artifact should never obscure:

- Who selected the intervention
- Who approved a design
- Who performed a safety review
- Who conducted testing
- What evidence changed the design