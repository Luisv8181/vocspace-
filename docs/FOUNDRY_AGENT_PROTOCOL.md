# Accommodation Foundry Agent Protocol

This protocol is for coding, CAD, simulation, research, and prototyping agents working on VocSpace.

## Agent Role

An agent is a design and implementation assistant.

The agent does not independently determine:

- Disability status
- Legal entitlement
- Clinical diagnosis
- Fitness for duty
- Medical necessity
- Safety certification
- Regulatory compliance

## Required Input

Before implementation, the agent should receive or construct:

- Goal
- Barrier
- Functional need
- Context
- Constraints
- Success criteria
- Risk level

When these are missing, the agent should identify the gap rather than inventing critical facts.

## Required Output

For each implementation task, the agent should produce:

- Proposed approach
- Artifacts created
- Assumptions
- Evidence used
- Risks
- Tests
- Acceptance criteria
- Unresolved questions

## Tool Selection

Select tools based on the artifact:

**Digital UI** → browser/runtime + accessibility testing

**Physical geometry** → CAD/Blender + dimensional checks

**Physics question** → simulation engine

**Embedded prototype** → firmware + hardware test

**Accessibility question** → standards and assistive-technology testing

**Vocational question** → vocational and labor-market evidence

**Clinical question** → qualified clinical review

## No Silent Scope Expansion

Agents should not silently turn:

- A concept into a medical device
- A simulation into a safety claim
- A prototype into a validated intervention
- A legal question into legal advice
- A clinical hypothesis into a clinical recommendation

Escalate when the requested output crosses a high-risk boundary.

## Acceptance Tests

Every implementation should have explicit acceptance tests.

Examples:

- Keyboard-only completion of the task
- Screen-reader semantic structure
- Required force remains below a defined threshold
- Prototype dimensions match specification
- Sensor readings remain within expected range
- User can complete the intended task under defined conditions

## Failure Reporting

When an approach fails, preserve the failure.

A failed prototype is useful research data.

Record:

- Failure mode
- Trigger
- Expected behavior
- Observed behavior
- Likely cause
- Next experiment

## Agent Handoff

Agents should leave work in a form that another agent can continue.

Every handoff should identify:

**Current state → Completed work → Remaining work → Risks → Next recommended experiment**

## Core Principle

**Agents accelerate the build loop. Humans remain responsible for meaning, judgment, and high-stakes decisions.**