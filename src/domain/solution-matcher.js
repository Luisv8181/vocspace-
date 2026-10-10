const TOKEN_MAP = {
  "cognitive-load": ["information", "cognitive", "focus", "attention", "visual", "interrupt"],
  "task-resumption": ["resume", "interruption", "interrupt", "sequence", "multi-step", "remember", "next action"],
  "web-orientation": ["website", "web", "navigation", "navigate", "form", "online", "orientation"],
  "physical-grip": ["grip", "handle", "tool", "hold", "hand", "force", "physical"],
  "communication-access": ["communication", "language", "translate", "caption", "transcript", "understand", "express", "speak"]
};

const PATTERN_BY_ID = {
  "AP-001": { tokens: TOKEN_MAP["cognitive-load"] },
  "AP-002": { tokens: TOKEN_MAP["task-resumption"] },
  "AP-003": { tokens: TOKEN_MAP["web-orientation"] },
  "AP-004": { tokens: TOKEN_MAP["physical-grip"] },
  "AP-005": { tokens: TOKEN_MAP["communication-access"] }
};

function normalizedText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
}

function tokenize(value) {
  return normalizedText(value).split(/\s+/).filter((token) => token.length > 2);
}

function overlapScore(text, tokens) {
  const normalized = normalizedText(text);
  return tokens.filter((token) => normalized.includes(token)).length;
}

const NEGATION_CUES = /\b(?:do not|don't|dont|does not|doesn't|doesnt|did not|didn't|didnt|never|no longer|without|avoid|avoids|avoiding|unwanted)\b/g;

/**
 * Only suppress direct rejected mentions. Split on contrast clauses to prevent
 * a rejected term from cancelling a positive alternative. This is a narrow
 * rule-based safeguard, not natural-language understanding.
 */
function hasRejectedMention(text, ruleTokens) {
  const clauses = normalizedText(text)
    .split(/[.!?;,\n]+|\bbut\b|\bhowever\b|\binstead\b|\balthough\b/)
    .map((part) => part.trim())
    .filter(Boolean);

  return clauses.some((clause) => {
    for (const cue of clause.matchAll(NEGATION_CUES)) {
      const objectWindow = clause
        .slice((cue.index ?? 0) + cue[0].length)
        .trim()
        .split(/\s+/)
        .slice(0, 5)
        .join(" ");
      if (ruleTokens.some((token) => {
        const safeToken = token.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&");
        return new RegExp("\\b" + safeToken + "\\b").test(objectWindow);
      })) return true;
    }

    // Keep the compact "no captions" construction intentionally limited.
    return /\b(?:not|no)\s+(?:any\s+)?(?:captions?|transcripts?|translation|translated text|communication|language support|spoken instructions?)\b/.test(clause) &&
      ruleTokens.some((token) => clause.includes(token));
  });
}

export function hasNegatedPatternNeed(model, patternId) {
  const rule = PATTERN_BY_ID[patternId];
  if (!rule) return false;
  return [model?.functionalNeed, model?.barrier]
    .filter(Boolean)
    .some((field) => hasRejectedMention(field, rule.tokens));
}

export function hasSufficientContext(model) {
  const fields = ["functionalNeed", "barrier", "task", "context"];
  const populated = fields.filter((field) => String(model?.[field] || "").trim().length >= 8);
  const hasCore = ["functionalNeed", "barrier"].some((field) => String(model?.[field] || "").trim().length >= 8);
  return hasCore && populated.length >= 2;
}

function inferContexts(model) {
  const context = normalizedText(model.context);
  const task = normalizedText(model.task);
  const barrier = normalizedText(model.barrier);
  const values = new Set();
  if (/website|web|browser|online|portal|form/.test(context + " " + task + " " + barrier)) values.add("digital");
  if (/work|employer|office|job|workplace/.test(context + " " + task)) values.add("workplace");
  if (/tool|grip|handle|hand|force|object/.test(task + " " + barrier)) values.add("physical-task");
  if (/speak|language|translate|caption|understand|communication/.test(task + " " + barrier)) values.add("communication");
  if (/school|student|study|class|education/.test(context + " " + task)) values.add("education");
  return [...values];
}

/**
 * Transparent baseline matcher, not a clinical or legal recommendation engine.
 * Uses inspectable lexical overlap and user context, never a diagnosis.
 */
export function matchAccommodationPatterns(model, patterns, options = {}) {
  const limit = Math.max(1, Math.min(Number(options.limit) || 5, 10));
  if (!model || !hasSufficientContext(model)) return [];
  const query = [
    model.functionalNeed,
    model.barrier,
    model.task,
    model.context,
    ...(Array.isArray(model.constraints) ? model.constraints : [])
  ].join(" ");
  const inferredContexts = inferContexts(model);
  const queryTokens = tokenize(query);

  const ranked = patterns.map((pattern) => {
    const rule = PATTERN_BY_ID[pattern.id] || { tokens: [] };
    const explicitlyNegated = hasNegatedPatternNeed(model, pattern.id);
    const primary = explicitlyNegated ? 0 : overlapScore(query, rule.tokens);
    const needsScore = explicitlyNegated ? 0 : overlapScore(model.functionalNeed, rule.tokens);
    const approachText = [
      pattern.title,
      pattern.mechanism,
      ...(pattern.candidateApproaches || []),
      ...(pattern.contexts || [])
    ].join(" ");
    const ignoredTokens = new Set(["task", "work", "help", "need", "make", "difficult", "support", "person", "thing", "something", "unable"]);
    const meaningfulTokens = [...new Set(queryTokens)].filter((token) => token.length >= 4 && !ignoredTokens.has(token));
    const patternTokens = tokenize(approachText);
    const supporting = explicitlyNegated ? 0 : meaningfulTokens.filter((token) =>
      patternTokens.some((candidate) => candidate === token || candidate.startsWith(token) || token.startsWith(candidate))
    ).length;
    const contextMatches = explicitlyNegated ? 0 : inferredContexts.filter((context) =>
      (pattern.contexts || []).some((entry) => {
        const p = normalizedText(entry);
        return p.includes(context) || context.includes(p);
      })
    ).length;
    const score = primary * 3 + needsScore * 4 + Math.min(supporting, 6) + contextMatches * 2;
    const hasMeaningfulMatch = !explicitlyNegated && (primary > 0 || needsScore > 0 || contextMatches > 0);
    const reasons = [];
    if (explicitlyNegated) reasons.push("The functional-need or barrier text appears to explicitly reject this type of support, so it was suppressed by a conservative negation guard.");
    else {
      if (needsScore > 0) reasons.push("The functional-need description overlaps with this pattern's focus.");
      if (primary > 0) reasons.push("The task, barrier, or context contains terms associated with this pattern.");
      if (contextMatches > 0) reasons.push("The inferred context overlaps with the pattern's documented contexts.");
    }
    if (reasons.length === 0) reasons.push("No direct matching signal was found. Consider clarifying the barrier or reviewing this pattern manually.");
    const confidence = score >= 12 ? "strong lexical match" : score >= 5 ? "possible match" : "exploratory alternative";
    return {
      pattern,
      score,
      confidence: hasMeaningfulMatch ? confidence : "exploratory alternative",
      hasMeaningfulMatch,
      reasons,
      contextMatches,
      matchedTerms: explicitlyNegated ? [] : rule.tokens.filter((token) => normalizedText(query).includes(token))
    };
  }).sort((a, b) => b.score - a.score || a.pattern.id.localeCompare(b.pattern.id));

  const relevant = ranked.filter((item) => item.hasMeaningfulMatch);
  if (relevant.length === 0) return [];
  return relevant.slice(0, limit);
}

export function routeResources(pattern, resources) {
  const wanted = new Set();
  if (pattern.id === "AP-001" || pattern.id === "AP-003") {
    wanted.add("techa11y");
    wanted.add("developer-coding-agent");
    wanted.add("accessibility-professional");
  }
  if (pattern.id === "AP-002" || pattern.id === "AP-005") {
    wanted.add("jan");
    wanted.add("vocational-rehabilitation");
    wanted.add("accessibility-professional");
  }
  if (pattern.id === "AP-004") {
    wanted.add("assistive-technology");
    wanted.add("vocational-rehabilitation");
  }
  for (const category of pattern.resourceCategories || []) wanted.add(category);
  return resources.filter((resource) => wanted.has(resource.id));
}
