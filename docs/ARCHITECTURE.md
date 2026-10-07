# VocSpace Architecture

## System Model

```
Person / Organization
        |
        v
   Barrier Intake
        |
        v
 Functional Need Model
        |
        v
 Solution Intelligence
   /       |       \
Resources  Design   People
   \       |       /
        v
   Solution Plan
        |
        v
Implementation / Conversation
        |
        v
       Test
        |
        v
     Outcome
        |
        +----> anonymized knowledge
```

## Domain Objects

### Barrier
What prevents a person from completing a task in a particular context.

Fields:
- context
- task
- environment
- observed difficulty
- affected activity
- frequency/severity
- user-reported impact

### Functional Need
The capability or condition needed to complete the task.

Examples:
- reduced distraction
- alternative input method
- visual information in another modality
- predictable scheduling
- communication in writing
- reduced sensory load

### Solution
A possible intervention.

Types:
- human/process
- environmental
- physical
- digital
- assistive technology
- policy/workflow
- communication
- service/provider

### Resource
An external or internal solution source.

Examples:
- JAN
- TechA11y
- WCAG guidance
- AT vendors
- VR agencies
- accessibility consultants
- developers

Resources should have capability tags so VocSpace can route cases to them rather than merely listing them.

### Solution Plan
A context-specific proposal containing:
- barrier
- functional need
- selected intervention
- alternatives
- rationale
- source evidence
- implementation owner
- implementation steps
- validation criteria
- follow-up status

### Outcome
Whether the intervention actually reduced the barrier.

This is critical. VocSpace should eventually learn from outcomes rather than merely accumulating recommendations.

## Intelligence Layer

The recommendation engine should operate on structured concepts, not raw text alone.

Initial reasoning chain:

```
Task
→ Barrier
→ Functional Requirement
→ Intervention Pattern
→ Candidate Resources
→ Implementation Plan
→ Validation
```

## Resource Routing

A resource should expose structured capabilities such as:

```
{
  "domain": "digital-accessibility",
  "capabilities": [
    "web-audit",
    "wcag-remediation",
    "continuous-monitoring"
  ],
  "audience": ["organizations", "developers"],
  "delivery": "external-service",
  "sources": []
}
```

This allows VocSpace to route a digital accessibility case to TechA11y when appropriate without pretending TechA11y solves every accessibility problem.

## Privacy

Do not collect diagnostic or medical information unless it is necessary for a user-selected workflow.

Separate:
- identity
- case context
- sensitive health/disability information
- organizational information
- public knowledge

The first prototype should prefer synthetic/demo cases and minimize sensitive data collection.

## MVP Boundary

The first build should prove the core loop, not attempt a full case-management system.

MVP:
1. Describe a barrier
2. Identify functional need
3. Generate multiple solution pathways
4. Cite the source behind each pathway
5. Route to relevant resources
6. Produce an actionable solution plan
7. Record validation/outcome

Defer:
- medical-document storage
- employer HR integrations
- automated accommodation submissions
- legal determinations
- payments/marketplace
- broad case management
