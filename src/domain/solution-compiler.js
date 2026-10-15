/**
 * Solution Compiler for VocSpace (Roadmap Phase 4).
 * Compiles selected accommodation pathways into 4 actionable, copyable artifacts:
 * 1. Formal Accommodation Request Letter (ADA Title I / JAN aligned)
 * 2. Technical Specification & AI Coding Agent Prompt (for digital implementations)
 * 3. Workplace Implementation & Safety Checklist
 * 4. Outcome Validation & Longitudinal Protocol (30/60-day review rubric)
 */

export function compileSolutionArtifacts(barrierCase, selectedSolutions = [], options = {}) {
  const workerName = options.workerName || "[Employee / Student Name]";
  const recipientName = options.recipientName || "[Supervisor / HR Representative / Accessibility Coordinator]";
  const jobTitle = options.jobTitle || "[Job Title / Academic Program]";
  const dateStr = options.date || new Date().toISOString().split("T")[0];
  const trialDays = options.trialDays || 30;

  const solutions = selectedSolutions.length > 0 
    ? selectedSolutions 
    : (barrierCase.solutions ? [barrierCase.solutions[0]] : []);

  // 1. Formal Accommodation Request Letter
  const requestLetter = generateAccommodationRequestLetter({
    barrierCase,
    solutions,
    workerName,
    recipientName,
    jobTitle,
    dateStr,
    trialDays
  });

  // 2. Technical Implementation Spec & AI Coding Agent Prompt
  const technicalSpec = generateTechnicalCodingPrompt({
    barrierCase,
    solutions
  });

  // 3. Workplace Implementation & Safety Checklist
  const implementationChecklist = generateImplementationChecklist({
    barrierCase,
    solutions,
    trialDays
  });

  // 4. Outcome Validation Protocol
  const outcomeProtocol = generateOutcomeProtocol({
    barrierCase,
    solutions,
    trialDays
  });

  return {
    timestamp: new Date().toISOString(),
    barrierCaseId: barrierCase.id,
    solutionsCount: solutions.length,
    artifacts: {
      requestLetter,
      technicalSpec,
      implementationChecklist,
      outcomeProtocol
    }
  };
}

function generateAccommodationRequestLetter({
  barrierCase,
  solutions,
  workerName,
  recipientName,
  jobTitle,
  dateStr,
  trialDays
}) {
  const solutionBullets = solutions.map((sol, index) => {
    return `${index + 1}. **Option ${index + 1}: ${sol.name} (${sol.type.toUpperCase()})**
   - **Mechanism:** ${sol.mechanism}
   - **Why this helps:** ${sol.rationale}
   - **Anticipated feasibility:** ${sol.implementationDifficulty ? `Estimated effort: ${sol.implementationDifficulty}` : "Manageable with minimal operational disruption"}`;
  }).join("\n\n");

  const strengthsText = (barrierCase.strengths && barrierCase.strengths.length > 0)
    ? `I have successfully leveraged the following competencies in my role: ${barrierCase.strengths.join("; ")}.`
    : "I remain dedicated to fulfilling all core responsibilities of my position effectively.";

  const constraintsText = (barrierCase.constraints && barrierCase.constraints.length > 0)
    ? `This request takes into account existing organizational requirements: ${barrierCase.constraints.join("; ")}.`
    : "";

  return `DATE: ${dateStr}
TO: ${recipientName}
FROM: ${workerName}
ROLE: ${jobTitle}
SUBJECT: Collaborative Request for Reasonable Accommodation / Workplace Adjustment

Dear ${recipientName},

I am writing to formally request a workplace adjustment and initiate the collaborative interactive process in accordance with Title I of the Americans with Disabilities Act (ADA) and company policy.

### 1. Goal and Essential Job Functions
My objective is to continue performing my essential duties—specifically: "${barrierCase.task}"—at the highest level of productivity and quality, aligned with our overarching goal: "${barrierCase.participationGoal}". ${strengthsText}

### 2. Functional Barrier and Operating Context
In my current working environment (${barrierCase.context}), I am encountering a significant functional barrier:
> "${barrierCase.barrier}"

Functionally, to maintain consistent performance and avoid unnecessary physical/cognitive strain, I require support with:
> **${barrierCase.functionalNeed}**

*Note on Privacy:* As recommended by Job Accommodation Network (JAN) best practices, this request focuses directly on functional capability and environmental barriers rather than medical diagnostic labels.

### 3. Proposed Accommodation Options for Collaborative Discussion
To proactively address this functional need, I have explored evidence-based solution pathways with the VocSpace accommodation intelligence model. I would welcome your review of the following candidate options:

${solutionBullets}

${constraintsText}

### 4. Proposed ${trialDays}-Day Trial Period
Because effective accommodations often benefit from real-world verification, I propose we implement our agreed intervention on a **${trialDays}-day trial basis**. At the conclusion of this trial, we can conduct a brief check-in to assess whether the solution successfully mitigated the barrier without causing operational friction.

### 5. Next Steps
I would appreciate the opportunity to meet with you for 15–20 minutes this week to discuss these options and determine the most seamless path forward. Thank you for your support and partnership.

Sincerely,

${workerName}
${jobTitle}`;
}

function generateTechnicalCodingPrompt({ barrierCase, solutions }) {
  const digitalSolutions = solutions.filter((s) => s.type === "digital");
  const targetSolutions = digitalSolutions.length > 0 ? digitalSolutions : solutions;

  const solutionsSpecs = targetSolutions.map((s, idx) => `
### Feature Component ${idx + 1}: ${s.name}
- **Type:** ${s.type}
- **Target Mechanism:** ${s.mechanism}
- **Design Rationale:** ${s.rationale}
- **Known Tradeoffs to Guard Against:** ${(s.tradeoffs || []).join(", ") || "None specified"}
`).join("\n");

  return `<!-- SYSTEM PROMPT FOR AI CODING AGENTS & SOFTWARE ENGINEERS -->
# ACCESSIBILITY & ACCOMMODATION TECHNICAL SPECIFICATION
Generated by VocSpace Engine for Case: "${barrierCase.title || barrierCase.id}"

## 1. AGENT MISSION & ROLE
You are a Senior Accessibility Engineer specializing in WCAG 2.2 AAA compliance, WAI-ARIA authoring practices, and cognitive/motor ergonomics. Your task is to implement accessible digital adaptations that directly eliminate the functional barrier described below.

## 2. FUNCTIONAL BARRIER & TARGET CONTEXT
- **User Goal:** ${barrierCase.participationGoal}
- **Failing Task:** ${barrierCase.task}
- **Context:** ${barrierCase.context}
- **Observed Friction:** ${barrierCase.barrier}
- **Core Functional Requirement:** ${barrierCase.functionalNeed}

## 3. SOLUTION ARCHITECTURE & IMPLEMENTATION SPECS
${solutionsSpecs}

## 4. STRICT TECHNICAL & ACCESSIBILITY CONSTRAINTS
1. **WCAG 2.2 Level AA / AAA Conformance:**
   - Contrast ratio must meet minimum 4.5:1 for normal text (7:1 preferred in high-contrast mode).
   - Ensure explicit keyboard focus indicators (minimum 3px outline with 3:1 contrast against background).
   - All interactive controls must support full keyboard traversal (\`Tab\`, \`Shift+Tab\`, \`Enter\`, \`Space\`, \`Escape\`). Zero focus traps.
2. **Semantic DOM & ARIA Landmarks:**
   - Do NOT use meaningless \`<div>\` or \`<span>\` for buttons or dialogs. Use native \`<button>\`, \`<dialog>\`, \`<main>\`, \`<nav>\`.
   - Dynamic updates must be communicated politely via \`aria-live="polite"\` status regions.
   - Screen reader announcements must clarify state changes without overwhelming the user.
3. **Cognitive & Motor Ergonomics:**
   - Support user-configurable density (standard vs compact vs focused reading mode).
   - Ensure click targets are at least 44x44 CSS pixels.
   - Respect user system preferences: \`@media (prefers-reduced-motion: reduce)\` and \`@media (prefers-color-scheme: dark)\`.

## 5. VERIFICATION & TEST CRITERIA
Execute the following verification checklist before finalizing the build:
\`\`\`bash
# 1. Run automated axe-core / Lighthouse audit
npx @axe-core/cli index.html --exit

# 2. Manual Keyboard Audit:
# - Tab through all interactive elements in logical order.
# - Verify visible focus indicator on every element.
# - Test Escape key dismisses modals and returns focus to trigger.

# 3. Screen Reader Testing:
# - Verify NVDA / VoiceOver correctly announces landmarks and labels.
\`\`\`

Implement the solution cleanly, providing modular, well-documented, test-covered code.`;
}

function generateImplementationChecklist({ barrierCase, solutions, trialDays }) {
  return `# Workplace Implementation & Safety Checklist
**Case:** ${barrierCase.title || barrierCase.id}
**Target Functional Need:** ${barrierCase.functionalNeed}
**Evaluation Window:** ${trialDays} Calendar Days

---

### Phase 1: Collaborative Alignment & Authorization (Week 1)
- [ ] **Interactive Meeting Conducted:** Worker and supervisor/HR meet to review the accommodation request letter.
- [ ] **Pathway Selected:** Agreement reached on primary solution(s):
${solutions.map((s) => `  - [ ] Implement: ${s.name} (${s.type})`).join("\n")}
- [ ] **Funding / Resource Routing:** Verify if State Vocational Rehabilitation (VR) or internal assistive tech budget will fund equipment.
- [ ] **Confidentiality Maintained:** Confirmation that medical diagnostic details remain strictly confidential and separated from personnel file.

---

### Phase 2: Technical Procurement & Configuration (Week 1–2)
- [ ] **Hardware / Software Requisition:** Submit purchase or license orders for selected adaptive tools.
- [ ] **IT & Security Vetting:** Ensure software or browser extensions meet enterprise data security standards.
- [ ] **Physical Setup / Ergonomic Calibration:** Deliver equipment and adjust desk, chair, monitors, or lighting to personalized ergonomic heights.
- [ ] **Baseline Metrics Recorded:** Record pre-intervention baseline score for task completion time, fatigue (1–10), and error rate.

---

### Phase 3: Operational Integration & Conventions (Week 2–3)
- [ ] **Team Communication Conventions:** If solution involves interruption protocols or quiet focus blocks, brief team members on communication expectations.
- [ ] **Alternative Communication Tested:** Verify dual channels (written notes, live captions, or asynchronous channels) are active.
- [ ] **Safety & Boundary Check:** Ensure physical adapters or cables do not create tripping hazards or block emergency egress routes.
- [ ] **Day 7 Informal Check-In:** Quick 10-minute check to resolve initial configuration hitches.

---

### Phase 4: Trial Period Conclusion & Decision (Day ${trialDays})
- [ ] **Outcome Rubric Completed:** Review changes in task accuracy, cognitive fatigue, and participation comfort.
- [ ] **Secondary Barrier Audit:** Verify that the intervention did not inadvertently introduce unintended friction.
- [ ] **Final Disposition Documented:** ( ) Adopt as permanent standard | ( ) Refine parameters | ( ) Pivot to secondary pathway.`;
}

function generateOutcomeProtocol({ barrierCase, solutions, trialDays }) {
  return `# Longitudinal Outcome Validation Protocol
**Case:** ${barrierCase.title || barrierCase.id}
**Intervention(s):** ${solutions.map((s) => s.name).join(", ")}
**Trial Duration:** ${trialDays} Days

VocSpace Design Principle: *Learn from outcomes, not just recommendations.*

---

## 1. Quantitative Baseline vs. Follow-up Metrics

| Metric Dimension | Baseline (Pre-Intervention) | Day 7 Check-in | Day ${trialDays} Evaluation | Delta / Change |
| :--- | :---: | :---: | :---: | :---: |
| **Task Completion Rate (%)** | [ e.g. 65% ] | [ ] | [ ] | [ ] |
| **Average Task Duration (mins)** | [ e.g. 90m ] | [ ] | [ ] | [ ] |
| **Self-Reported Fatigue (1–10)** | [ e.g. 8/10 ] | [ ] | [ ] | [ ] |
| **Error / Correction Frequency** | [ e.g. 5 / shift ] | [ ] | [ ] | [ ] |
| **Autonomy / Independence Scale (1–5)**| [ e.g. 2/5 ] | [ ] | [ ] | [ ] |

---

## 2. Core Qualitative Validation Questions

### Question 1: Barrier Reduction
> *Did the intervention directly reduce the target barrier ("${barrierCase.barrier}")?*
- **Response:** [ ] Significant Reduction | [ ] Moderate Reduction | [ ] Minimal / No Change | [ ] Worsened
- **Notes / Observations:** __________________________________________________________________

### Question 2: Unintended Secondary Friction
> *Did the intervention create any new or unexpected barriers for the individual or colleagues?*
- **Checklist:**
  - [ ] Social or team friction
  - [ ] Technical instability or software conflicts
  - [ ] Additional cognitive tracking overhead
  - [ ] Physical discomfort or balance changes
- **Details:** __________________________________________________________________

### Question 3: Solution Fit & Sustainability
> *Can the person sustain this workflow indefinitely without excessive compensatory effort?*
- **Details:** __________________________________________________________________

---

## 3. Outcome Verdict & Systematic Disposition

- [ ] **VERDICT A: Validated & Permanent**
  *The solution successfully mitigated the functional barrier and will be codified as the standard working arrangement.*

- [ ] **VERDICT B: Iterative Refinement Required**
  *The core mechanism is sound, but adjustments are needed (e.g. adjust lighting lux, refine focus block hours).*

- [ ] **VERDICT C: Pivot to Alternative Pathway**
  *The selected intervention caused secondary friction or proved insufficient. Activate alternative candidate pathway:*
  *(e.g. ${solutions.length > 1 ? solutions[1].name : "Select next candidate pattern from VocSpace"})*

---
*Signed by Worker:* _________________________   *Date:* _______________
*Signed by Evaluator/Supervisor:* ______________   *Date:* _______________`;
}
