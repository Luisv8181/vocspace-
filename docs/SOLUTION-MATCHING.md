# Solution Matching Engine

## Purpose

The first matcher ranks draft accommodation patterns against a functional model. It does not diagnose, decide eligibility, or establish that an accommodation will work.

## Inputs

- Functional need
- Barrier
- Task
- Environment/context
- Constraints

The algorithm intentionally does not use a diagnosis field.

## Baseline method

The implementation uses deterministic, inspectable lexical and context overlap. It gives additional weight to matches against the functional-need description and returns a rationale, matched terms, and a relative lexical-match label.

These labels are **not probabilities** and must not be interpreted as accuracy estimates. This is a prototype heuristic, not a validated inference model. Terms and weights are hypotheses for review and user testing.

## Input sufficiency and no-match behavior

The matcher requires a minimally described model: at least one of functional need or barrier should be meaningfully described, and at least one additional task/context field should be present. This is a lightweight completeness gate, not a clinical adequacy check.

If the model is too sparse, the matcher returns no ranked patterns so the UI can ask for more context. If there is no direct rule/context signal, the matcher returns no results rather than filling the screen with unrelated patterns.

## Negation guard

A conservative guard suppresses a pattern when the functional-need or barrier field mentions that pattern's rule terms in an explicitly negated clause, for example "I do not need captions." This is a narrow safeguard to avoid treating a stated preference as the opposite of what the user said.

It is **not** natural-language understanding. Mixed or ambiguous statements, complex grammar, other languages, sarcasm, and negation outside the two checked fields may not be handled correctly. A human must clarify ambiguous inputs. The feature must never be treated as a substitute for user confirmation.

## Resource routing

Patterns link to resource categories by capability. They are not ranked by advertising value. Resource records need verified URLs, attribution, and source review before being promoted into external navigation.

## UI requirements

For every matched pattern, show:

- Pattern ID and title
- Why it matched
- Matched terms
- Relative lexical-match label
- Tradeoffs and validation ideas
- Source / provenance status
- Relevant resource categories

Always label results as candidate options. Do not call the highest-ranked pattern "the correct accommodation."

## Evaluation plan

Measure:

- Precision among top-ranked patterns through qualified reviewer or participant assessment
- Coverage of relevant candidate patterns
- Rate of misleading or inapplicable matches
- User ability to explain why options surfaced
- Action-plan usefulness
- Accessibility and usability of the interface

Do not tune solely for clicks or acceptance. A plausible-sounding but unsuitable suggestion is a failure.

## Rendering safety and accessibility QA

Node tests check escaping in rendered pattern/source strings and the external-link safety attributes. These tests help guard against a narrow class of injection and markup regressions; they do not prove the complete browser UI is secure or accessible.

Follow [the Accessibility QA Checklist](ACCESSIBILITY-QA-CHECKLIST.md) to record keyboard, screen-reader, responsive, contrast, and functional testing against a specific build. Those manual tests remain outstanding until a tester records their results.

## Current limits

Continue testing synonyms, misspellings, negation, contradictory input, ambiguous descriptions, multiple languages, and domain mismatch. Review each source-to-claim mapping before describing a pattern as evidence-supported. The matcher is only a prototype heuristic, and the pattern library remains draft.
