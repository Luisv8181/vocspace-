/**
 * Source catalog for VocSpace research and resource routing.
 * Links point to source landing pages; no third-party article text is republished.
 * Reviewed 2026-10-08. Recheck source availability, attribution, and terms before production use.
 */
export const sourceCatalog = [
  {
    id: "JAN-ATTENTION-DISTRACTIONS",
    title: "Accommodating Distracting Work Spaces",
    publisher: "Job Accommodation Network (JAN)",
    url: "https://askjan.org/blogs/jan/2019/11/accommodating-distracting-work-spaces.cfm",
    sourceType: "specialist-practitioner-guidance",
    supports: ["workplace attention and concentration", "exploring multiple environmental and scheduling options", "reviewing and monitoring fit"],
    limitations: ["Workplace example, not universal guidance", "Options require individual and job-context review"],
    retrievedAt: "2026-10-08",
    licenseOrUseNotes: "Link to the source. Do not reproduce full article content without permission.",
    reviewStatus: "human-review-required"
  },
  {
    id: "JAN-GRIP-GRASP",
    title: "Get A Grip! DIY & Practical Solutions for Gripping and Grasping",
    publisher: "Job Accommodation Network (JAN)",
    url: "https://askjan.org/articles/Get-A-Grip-DIY-Practical-Solutions-for-Gripping-and-Grasping.cfm",
    sourceType: "specialist-practitioner-guidance",
    supports: ["gripping and grasping barriers", "exploring task and tool modifications"],
    limitations: ["Does not replace an engineering safety assessment", "Custom parts require context-specific testing"],
    retrievedAt: "2026-10-08",
    licenseOrUseNotes: "Link to the source. Do not republish article content without permission.",
    reviewStatus: "human-review-required"
  },
  {
    id: "JAN-MONITORING",
    title: "Monitoring Reasonable Accommodations",
    publisher: "Job Accommodation Network (JAN)",
    url: "https://askjan.org/articles/Monitoring-Reasonable-Accommodations.cfm",
    sourceType: "specialist-practitioner-guidance",
    supports: ["ongoing effectiveness checks", "documenting whether an accommodation still works", "revisiting options when context changes"],
    limitations: ["General guidance, not legal advice", "Use privacy-minimizing monitoring focused on accommodation effectiveness"],
    retrievedAt: "2026-10-08",
    licenseOrUseNotes: "Link to the source and retain concise source metadata only.",
    reviewStatus: "human-review-required"
  },
  {
    id: "JAN-EFFECTIVE-COMMUNICATION",
    title: "Effective Communication",
    publisher: "Job Accommodation Network (JAN)",
    url: "https://askjan.org/topics/effect.cfm",
    sourceType: "specialist-resource-topic-page",
    supports: ["communication accessibility as a distinct problem domain", "finding related JAN publications and examples"],
    limitations: ["Topic landing page; consult the linked publication appropriate to the specific context"],
    retrievedAt: "2026-10-08",
    licenseOrUseNotes: "Link to source page; verify the specific guidance that supports each claim.",
    reviewStatus: "human-review-required"
  },
  {
    id: "JAN-COMMUNICATION-PROCESS",
    title: "Why Communication Is Key to the Accommodation Process",
    publisher: "Job Accommodation Network (JAN)",
    url: "https://askjan.org/publications/consultants-corner/Why-Communication-Is-Key-to-the-Accommodation-Process.cfm",
    sourceType: "specialist-practitioner-guidance",
    supports: ["collaborative communication during accommodation exploration", "avoiding adversarial framing"],
    limitations: ["General process guidance; do not treat as a statement that a particular solution is legally required"],
    retrievedAt: "2026-10-08",
    licenseOrUseNotes: "Link to source; do not republish full article.",
    reviewStatus: "human-review-required"
  },
  {
    id: "JAN-ACCOMMODATION-TOOLKIT",
    title: "Workplace Accommodation Toolkit",
    publisher: "Job Accommodation Network (JAN)",
    url: "https://askjan.org/publications/guide-downloads.cfm?action=download&loc=individuals&pubid=14876339&pubtype=pdf",
    sourceType: "specialist-guide",
    supports: ["accommodation as a process", "monitoring and revisiting effectiveness"],
    limitations: ["Workplace-specific; applicability must be assessed", "Consult source directly for full context"],
    retrievedAt: "2026-10-08",
    licenseOrUseNotes: "Catalog points to JAN's source download; do not mirror or redistribute it without permission.",
    reviewStatus: "human-review-required"
  }
];

export const sourceById = Object.fromEntries(sourceCatalog.map((source) => [source.id, source]));
