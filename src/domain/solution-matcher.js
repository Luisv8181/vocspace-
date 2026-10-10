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
 * Conservative clause-local negation. A positive follow-up clause should not
 * be suppressed just because an earlier clause rejected a different option.
 * This remains a heuristic, not natural-language understanding.
 */
function containsNegatedNeed(text, ruleTokens) {
  const clauses = normalizedText(text)
    .split(/[.!?;,\n]+|\bbut\b|\bhowever\b|\binstead\b|\balthough\b/)
    .map((part) => part.trim())
    .filter(Boolean);

  return clauses.some((clause) => {
    const mentionIndexes = ruleTokens
      .map((token) => clause.indexOf(token))
      .filter((index) => index >= 0);
    if (!mentionIndexes.length) return false;

    for (const match of clause.matchAll(NEGATION_CUES)) {
      const negationIndex = match.index ?? 0;
      const nextTokenIndex = Math.min(
        ...ruleTokens.map((token) => {
          const index = clause.indexOf(token, negationIndex + match[0].length);
          return index < 0 ? Number.POSITIVE_INFINITY : index;
        })
      );
      const nearestPriorTokenIndex = Math.max(
        -1,
        ...mentionIndexes.filter((index) => index < negationIndex)
      );
      // Only suppress when a pattern term follows the negation cue in the
      // same clause, before any punctuation/clause boundary.
      if (nextTokenIndex !== Number.POSITIVE_INFINITY &&
          (nearestPriorTokenIndex < 0 || nextTokenIndex < nearestPriorTokenIndex)) {
        return true;
      }
    }
    // "not captions", "no captions", and "no need for captions" have no
    // multi-word cue, so handle only the narrow immediate pattern.
    if (/\b(?:not|no)\s+(?:need for\s+)?(?:any\s+)?(?:captions?|transcripts?|translation|translated text|communication|language support|spoken instructions?)\b/.test(clause) &&
        ruleTokens.some((token) => new RegExp("\\b" + token + "\\b").test(clause))) {
      return true;
    }
    return false;
  });
}

/**
 * A conservative guard for explicit user preferences. Ambiguous or mixed
 * statements still need confirmation and must not be treated as resolved.
 */
export function hasNegatedPatternNeed(model, patternId) {
  const rule = PATTERN_BY_ID[patternId];
  if (!rule) return false;
  const relevantFields = [model?.functionalNeed, model?.barrier].filter(Boolean);
  return relevantFields.some((field) => containsNegatedNeed(field, rule.tokens));
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
