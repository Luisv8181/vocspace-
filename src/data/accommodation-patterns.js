export const accommodationPatterns = [
  {
    id: "AP-001",
    title: "Reduce competing information",
    functionalNeed: "Make task-relevant information easier to locate and process.",
    contexts: ["digital-work", "education", "online-services"],
    mechanism: "Reduce unnecessary visual and cognitive competition while preserving required context.",
    candidateApproaches: ["group-related-content", "progressive-disclosure", "user-controlled-reading-mode", "adjustable-text-density", "clear-navigation"],
    tradeoffs: ["over-simplification-can-hide-context", "implementation-may-affect-assistive-technology"],
    validationIdeas: ["task-completion", "navigation-errors", "time-on-task", "user-reported-effort"],
    provenance: { classes: ["vocspace-synthesis"], sourceIds: [], notes: "Original VocSpace synthesis; not yet source-reviewed." },
    reviewStatus: "draft"
  },
  {
    id: "AP-002",
    title: "Support task resumption",
    functionalNeed: "Help a person resume the correct activity after an interruption.",
    contexts: ["knowledge-work", "study", "multi-step-workflows"],
    mechanism: "Preserve a visible, low-friction recovery point for the current task.",
    candidateApproaches: ["persistent-next-action", "task-checkpoints", "interruption-notes", "save-and-resume", "team-interruption-conventions"],
    tradeoffs: ["tracking-may-add-work", "rigid-sequences-may-not-fit-changing-priorities"],
    validationIdeas: ["resumption-time", "missed-steps", "error-rate", "user-acceptability"],
    provenance: { classes: ["vocspace-synthesis"], sourceIds: [], notes: "Original VocSpace synthesis; not yet source-reviewed." },
    reviewStatus: "draft"
  },
  {
    id: "AP-003",
    title: "Improve website orientation",
    functionalNeed: "Maintain awareness of location, progress, and next actions in a digital service.",
    contexts: ["public-websites", "portals", "multi-step-forms"],
    mechanism: "Make structure, location, errors, and recovery options predictable and perceivable.",
    candidateApproaches: ["meaningful-headings", "consistent-navigation", "progress-indicators", "explicit-errors", "keyboard-support", "screen-reader-structure"],
    tradeoffs: ["extra-indicators-may-add-clutter", "breadcrumbs-do-not-fix-poor-information-architecture"],
    validationIdeas: ["keyboard-testing", "screen-reader-testing", "task-success", "recovery-from-errors"],
    provenance: { classes: ["vocspace-synthesis"], sourceIds: [], notes: "Original VocSpace synthesis; requires standards mapping and testing." },
    reviewStatus: "draft"
  },
  {
    id: "AP-004",
    title: "Reduce physical grip demand",
    functionalNeed: "Reduce grip effort while preserving control of a tool or object.",
    contexts: ["low-risk-tool-use", "household-tasks", "non-critical-work-tasks"],
    mechanism: "Change the contact geometry, task setup, or tool selection to reduce required grip effort.",
    candidateApproaches: ["commercial-adaptive-tool", "larger-handle", "textured-handle", "task-fixture", "reviewed-custom-adapter"],
    tradeoffs: ["larger-handles-may-not-fit-everyone", "added-material-can-change-balance", "custom-parts-can-create-hazards"],
    validationIdeas: ["fit", "control", "repeat-use", "failure-mode-review"],
    provenance: { classes: ["vocspace-synthesis"], sourceIds: [], notes: "Concept only; not an engineering specification." },
    reviewStatus: "draft",
    safetyBoundary: "No safety-critical, medical, mobility, load-bearing, or high-force use without qualified review."
  },
  {
    id: "AP-005",
    title: "Make communication more accessible",
    functionalNeed: "Support reliable expression and understanding in a particular interaction.",
    contexts: ["service-delivery", "workplace", "education", "healthcare-navigation"],
    mechanism: "Offer communication options and verify understanding while preserving agency and privacy.",
    candidateApproaches: ["written-and-spoken-options", "captions-or-transcript", "plain-language-summary", "language-choice", "confirmation-of-key-information", "alternative-communication"],
    tradeoffs: ["automated-translation-can-lose-nuance", "captured-content-may-create-privacy-risk"],
    validationIdeas: ["user-confirmed-understanding", "correction-burden", "interaction-goal-achieved"],
    provenance: { classes: ["vocspace-synthesis"], sourceIds: [], notes: "Original VocSpace synthesis; context-specific review required." },
    reviewStatus: "draft"
  }
];
