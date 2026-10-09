# Solution Matching Engine

## Purpose

The first matching engine ranks draft accommodation patterns against a functional model. It does not diagnose, decide eligibility, or establish that an accommodation will work.

## Inputs

- Functional need
- Barrier
- Task
- Environment/context
- Constraints

The algorithm intentionally does not use a diagnosis field.

## Baseline method

The current implementation uses deterministic, inspectable lexical and context overlap:

- Direct overlap with the functional-need description receives extra weight.
- Barrier, task, and context terms contribute.
- Pattern contexts contribute a small additional signal.
- Results include an explicit explanation, confidence label, and matched terms.
- Ties are stable by pattern ID.

This is a transparent baseline for prototyping, not a validated inference model. Terms and weights are hypotheses that need review and user testing.

## Resource routing

Patterns link to resource categories by capability, not by advertising rank. Resource records need verified URLs, attribution, and source review before being promoted into external navigation.

## UI guidance

For every matched pattern, show:

- Pattern ID and title
- Why it matched
- The matched terms
- Confidence label, described as a lexical match rather than probability
- Tradeoffs and validation ideas
- Source / provenance status
- Linked resource categories

Always label results as candidate options. Do not call the highest-ranked pattern "the correct accommodation."

## Evaluation plan

Measure:

- Precision among top-ranked patterns through expert or participant review
- Coverage of relevant candidate patterns
- Rate of misleading or inapplicable matches
- User ability to explain why options were surfaced
- Downstream action-plan usefulness
- Accessibility and usability of the interface

Do not tune solely for click-through or user acceptance. A plausible-sounding but unsuitable recommendation is a failure.
