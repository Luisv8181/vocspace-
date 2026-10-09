# Accommodation Pattern Library

This file contains original, generalized accommodation patterns for VocSpace prototyping. It is not a reproduction of JAN content or a substitute for individualized professional guidance.

Each pattern should help an agent reason from a functional barrier to several possible interventions. Treat patterns as starting points, not determinations.

## Pattern schema

Every pattern should include:

- Stable ID and title
- Functional need
- Contexts where it may apply
- Intervention mechanism
- Candidate approaches
- Tradeoffs and constraints
- Questions to ask before recommending
- Implementation and validation ideas
- Evidence and source provenance
- Confidence and review status

## Initial patterns

### AP-001: Reduce competing information

**Functional need:** Make task-relevant information easier to locate and process.

**Contexts:** Digital work, education, online services, complex forms.

**Candidate approaches:** Reduce visual density; group related items; use progressive disclosure; offer reading/focus mode; allow text scaling; preserve clear navigation; let users control presentation.

**Questions:** Which information is necessary? What must remain visible? Does simplifying the interface hide safety-critical or contextually important information?

**Tradeoffs:** Over-simplification can remove context. Some modes can interfere with assistive technology if implemented poorly.

**Validation:** Compare task completion, navigation errors, time, and user-reported effort with and without the change.

**Provenance:** Original VocSpace synthesis. Evidence field is intentionally unpopulated until reviewed against suitable sources and testing.

### AP-002: Support task resumption

**Functional need:** Help a person resume the right activity after an interruption.

**Contexts:** Knowledge work, study, multi-step procedures, service workflows.

**Candidate approaches:** Persistent next-action indicator; interruption notes; task checkpoints; clear save/resume state; predictable step order; agreed team interruption conventions.

**Questions:** What state is lost during an interruption? Which reminders are helpful rather than distracting? Are interruptions sometimes urgent?

**Tradeoffs:** Extra tracking can itself create work. A rigid sequence may not fit changing priorities.

**Validation:** Measure resumption time, missed steps, error rate, and acceptability.

**Provenance:** Original VocSpace synthesis. Evidence field is intentionally unpopulated pending source review and testing.

### AP-003: Improve website orientation

**Functional need:** Maintain awareness of location, progress, and next actions in a digital service.

**Contexts:** Public-service websites, portals, long forms, multi-step transactions.

**Candidate approaches:** Clear page titles; consistent navigation; breadcrumbs where appropriate; progress indicators; persistent step labels; explicit error messages; easy recovery; keyboard and screen-reader support.

**Questions:** What does the user need to know at each step? Can location and progress be understood without relying on color or visual placement alone?

**Tradeoffs:** Additional indicators can create clutter. Breadcrumbs do not replace meaningful headings or a coherent information architecture.

**Validation:** Test with keyboard-only navigation, assistive technologies, and representative task scenarios.

**Provenance:** Original VocSpace synthesis. Evidence field is intentionally unpopulated pending standards mapping and testing.

### AP-004: Reduce physical grip demand

**Functional need:** Reduce grip effort while preserving control of a tool or object.

**Contexts:** Low-risk tool use, household tasks, non-critical workplace tasks.

**Candidate approaches:** Explore commercially available adaptive tools; consider a larger or textured handle; change the task setup; use a mount or fixture; consider a custom adapter only after assessing fit and stability.

**Questions:** What forces are required? Could the change create pinch, slip, entrapment, hygiene, or control hazards? What happens if the part fails?

**Tradeoffs:** Larger handles can reduce access for some users. Added material can change balance or safety.

**Validation:** Define task-specific criteria and test fit, control, repeated use, and failure modes with appropriate oversight.

**Safety boundary:** Do not use unreviewed generated designs for load-bearing, medical, mobility, or safety-critical applications.

**Provenance:** Original conceptual pattern. Not an engineering specification or safety certification.

### AP-005: Make communication more accessible

**Functional need:** Support reliable expression and understanding in a particular interaction.

**Contexts:** Service delivery, workplace communication, education, healthcare navigation.

**Candidate approaches:** Offer written and spoken channels; plain-language summaries; captions or transcripts; supported language choice; confirmation of key information; allow response time; provide alternative communication methods.

**Questions:** Which communication mode does the person prefer? Does the proposed support preserve nuance, privacy, and agency?

**Tradeoffs:** Automated transcription or translation can be wrong. Capturing more information may create privacy risk.

**Validation:** Check understanding with the person, not just the system; track correction burden and whether the interaction goal was achieved.

**Provenance:** Original VocSpace synthesis. Requires context-specific review before deployment.
