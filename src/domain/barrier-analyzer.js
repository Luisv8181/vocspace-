import { accommodationPatterns } from "../data/accommodation-patterns.js";
import { resourceCategories, matchResourcesForCase } from "../data/resources.js";

/**
 * Keyword taxonomy mapping user-described friction points to functional categories.
 */
const DOMAIN_KEYWORDS = {
  cognitive: [
    "distract", "focus", "interrupt", "attention", "overwhelm", "density", "adhd", 
    "executive", "multitask", "organize", "prioritize", "clutter", "memory", "forget", "sequence"
  ],
  sensory_vision: [
    "glare", "light", "fluorescent", "headache", "migraine", "eye strain", "photophobia", 
    "contrast", "font", "small text", "blurry", "blind", "low vision", "screen reader", "color"
  ],
  sensory_auditory: [
    "noise", "loud", "open office", "hearing", "deaf", "chatter", "eavesdrop", "caption", 
    "transcript", "speech", "acoustic", "audio", "meeting", "overlapping"
  ],
  motor_ergonomic: [
    "grip", "hand", "wrist", "pain", "fatigue", "tendinitis", "carpal tunnel", "rsi", 
    "keyboard", "mouse", "typing", "reach", "tremor", "spasm", "arthritis", "lift", "chair", "desk", "posture"
  ],
  fatigue_stamina: [
    "tired", "exhaustion", "crash", "post-exertional", "stamina", "energy", "long covid", 
    "fibromyalgia", "dysautonomia", "pots", "pace", "pacing", "hours", "break", "rest", "commute"
  ],
  communication_language: [
    "clarify", "accent", "english learner", "esl", "vocabulary", "jargon", "understand", 
    "express", "stutter", "speech", "dialogue", "conversation", "writing", "reading", "comprehend"
  ],
  navigation_orientation: [
    "lost", "orient", "navigate", "breadcrumbs", "complex site", "structure", "steps", 
    "form", "portal", "hierarchy", "workflow"
  ]
};

/**
 * Analyzes arbitrary free-form barrier text and extracts structured functional needs,
 * domain classifications, clarifying questions, and matching accommodation patterns.
 */
export function analyzeBarrierInput({
  barrier = "",
  task = "",
  context = "",
  goal = "",
  strengths = [],
  constraints = []
}) {
  const fullText = `${barrier} ${task} ${context} ${goal}`.toLowerCase();

  // 1. Domain category scoring
  const domainScores = {};
  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (fullText.includes(kw)) score += 1;
    }
    domainScores[domain] = score;
  }

  const identifiedDomains = Object.entries(domainScores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([domain]) => domain);

  // 2. Synthesize barrier reframing & functional need
  let synthesizedNeed = "";
  if (identifiedDomains.includes("sensory_vision")) {
    synthesizedNeed = "Control workstation luminous intensity, eliminate specular glare, and optimize contrast hierarchies to maintain visual endurance.";
  } else if (identifiedDomains.includes("sensory_auditory")) {
    synthesizedNeed = "Attenuate intrusive conversational background noise and provide synchronous multimodal speech-to-text redundancy.";
  } else if (identifiedDomains.includes("motor_ergonomic")) {
    synthesizedNeed = "Eliminate repetitive static muscular strain, optimize upper-extremity neutral positioning, and provide alternative input channels.";
  } else if (identifiedDomains.includes("fatigue_stamina")) {
    synthesizedNeed = "Conserve physiological stamina through metabolic pacing, autonomous schedule buffering, and elimination of commute exertion.";
  } else if (identifiedDomains.includes("cognitive") || identifiedDomains.includes("navigation_orientation")) {
    synthesizedNeed = "Reduce extraneous cognitive overhead, preserve persistent task checkpoints, and externalize multi-step working memory cues.";
  } else if (identifiedDomains.includes("communication_language")) {
    synthesizedNeed = "Provide plain-language distillation, dual-channel communication (spoken + written), and adequate latency for message formulation.";
  } else {
    synthesizedNeed = "Identify targeted functional adaptations to reduce environmental friction while supporting task autonomy.";
  }

  // 3. Formulate targeted clarifying questions
  const clarifyingQuestions = [];
  if (identifiedDomains.includes("cognitive")) {
    clarifyingQuestions.push("Do interruptions originate primarily from synchronous team chats (e.g. Slack/Teams) or in-person walk-ups?");
    clarifyingQuestions.push("Would visual checklist checkpoints or automated focus timers better support resumption after interruptions?");
  }
  if (identifiedDomains.includes("sensory_vision")) {
    clarifyingQuestions.push("Is the glare coming from overhead troffer lighting, exterior windows, or specular reflections on monitor screens?");
    clarifyingQuestions.push("Does application-level dark mode provide relief, or is hardware-level lighting diffusion required?");
  }
  if (identifiedDomains.includes("motor_ergonomic")) {
    clarifyingQuestions.push("Which specific movements aggravate symptoms (sustained mouse clicking, pinch-gripping, or repetitive keystrokes)?");
    clarifyingQuestions.push("Has an ergonomic keyboard, vertical mouse, or speech dictation tool been tested previously?");
  }
  if (identifiedDomains.includes("fatigue_stamina")) {
    clarifyingQuestions.push("What time of day does cognitive or physical stamina typically hit its trough?");
    clarifyingQuestions.push("Could non-essential meetings be shifted to asynchronous written updates to conserve energy?");
  }
  if (clarifyingQuestions.length === 0) {
    clarifyingQuestions.push("What specific physical or digital cue signals the onset of difficulty during this task?");
    clarifyingQuestions.push("What workarounds or temporary strategies have provided partial relief so far?");
  }

  // 4. Pattern matching against accommodation patterns library
  const matchedPatterns = accommodationPatterns.filter((pattern) => {
    const patternText = `${pattern.title} ${pattern.functionalNeed} ${pattern.mechanism} ${pattern.contexts.join(" ")}`.toLowerCase();
    return identifiedDomains.some((dom) => {
      const keywords = DOMAIN_KEYWORDS[dom] || [];
      return keywords.some((kw) => patternText.includes(kw));
    });
  });

  // Ensure at least 2 patterns matched
  const finalPatterns = matchedPatterns.length >= 2 ? matchedPatterns : accommodationPatterns.slice(0, 3);

  // 5. Generate candidate multi-pathway solutions
  const candidateSolutions = finalPatterns.map((pat, index) => {
    let type = "digital";
    if (pat.contexts.includes("office-environment") || pat.id === "AP-006" || pat.id === "AP-007") {
      type = "environmental";
    } else if (pat.id === "AP-004" || pat.id === "AP-009" || pat.id === "AP-010") {
      type = "physical";
    } else if (pat.id === "AP-002" || pat.id === "AP-011" || pat.id === "AP-012" || pat.id === "AP-015") {
      type = "organizational";
    }

    return {
      id: `solution-${pat.id.toLowerCase()}-${index + 1}`,
      name: pat.title,
      type,
      mechanism: pat.mechanism,
      rationale: `Directly targets ${pat.functionalNeed.toLowerCase()}`,
      tradeoffs: pat.tradeoffs,
      implementationDifficulty: pat.candidateApproaches.length > 4 ? "medium" : "low",
      evidence: pat.provenance?.sourceIds || [pat.provenance?.notes || "VocSpace Pattern Knowledge Base"],
      resourceCategories: type === "digital" 
        ? ["developer-coding-agent", "techa11y"] 
        : type === "physical" 
          ? ["assistive-technology", "vocational-rehabilitation"] 
          : ["jan", "accessibility-professional"]
    };
  });

  // 6. Matched resources
  const allResourceIds = Array.from(new Set(candidateSolutions.flatMap((s) => s.resourceCategories)));
  const matchedResources = matchResourcesForCase(allResourceIds, identifiedDomains);

  return {
    participationGoal: goal || "Perform designated role activities with autonomy and sustainable health.",
    task: task || "Core duties described in case.",
    context: context || "Standard operating environment.",
    barrier,
    functionalNeed: synthesizedNeed,
    identifiedDomains,
    clarifyingQuestions,
    candidateSolutions,
    matchedPatterns: finalPatterns,
    matchedResources,
    strengths: Array.isArray(strengths) ? strengths : [],
    constraints: Array.isArray(constraints) ? constraints : []
  };
}
