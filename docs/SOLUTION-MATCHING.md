# Solution Matching Engine

## Purpose

The first matcher ranks draft accommodation patterns against a functional model. It does not diagnose, decide eligibility, or establish that an accommodation will work.

## Inputs

- Participation goal
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

## Negation handling

The current guard checks for a narrow set of negation cues within the same clause as one of a pattern's keywords. Contrast boundaries such as "but", "however", and "instead" split clauses so a positive alternative can remain matchable. Even with this change, the method is only a lexical heuristic. It can miss negation, misunderstand idioms, and mishandle mixed or ambiguous statements. Users must retain control, and ambiguous inputs should be clarified rather than treated as resolved.

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

Node tests check escaping in rendered pattern/source strings and external-link safety attributes. They guard against a narrow class of injection and markup regressions; they do not prove that the full browser UI is secure or accessible.

Follow [the Accessibility QA Checklist](ACCESSIBILITY-QA-CHECKLIST.md) to record keyboard, screen-reader, responsive, contrast, and functional testing against a specific build. Those manual tests remain outstanding until a tester records their results.

## Current limits

Continue testing synonyms, misspellings, negation, contradictory input, ambiguous descriptions, multiple languages, and domain mismatch. Review each source-to-claim mapping before describing a pattern as evidence-supported. The matcher is only a prototype heuristic, and the pattern library remains draft.
