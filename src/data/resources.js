export const resourceCategories = [
  {
    id: "jan",
    name: "JAN (Job Accommodation Network)",
    fullName: "Job Accommodation Network (US Dept of Labor ODEP)",
    capability: "Free workplace accommodation guidance, searchable online accommodation resource (SOAR), and ADA compliance consulting.",
    domains: ["workplace", "ergonomics", "neurodiversity", "sensory", "motor", "chronic-illness"],
    targetAudience: ["workers", "employers", "rehabilitation-counselors"],
    url: "https://askjan.org",
    evidenceNotes: "Gold-standard federal repository for evidence-based workplace accommodation strategies."
  },
  {
    id: "techa11y",
    name: "TechA11y",
    fullName: "TechA11y Digital Accessibility Remediation Platform",
    capability: "Automated & expert-driven web accessibility auditing, WCAG 2.2 remediation, and continuous monitoring.",
    domains: ["digital-accessibility", "web-engineering", "screen-readers"],
    targetAudience: ["developers", "organizations", "product-teams"],
    url: "https://techa11y.dev",
    evidenceNotes: "Specialized engineering platform for deep web accessibility compliance and remediation."
  },
  {
    id: "w3c-wai",
    name: "W3C WAI (Web Accessibility Initiative)",
    fullName: "World Wide Web Consortium Web Accessibility Initiative",
    capability: "International technical standards including WCAG 2.2, WAI-ARIA authoring practices, and cognitive accessibility guidance (COGA).",
    domains: ["digital-accessibility", "web-standards", "cognitive-accessibility"],
    targetAudience: ["developers", "designers", "organizations"],
    url: "https://www.w3.org/WAI",
    evidenceNotes: "Foundational international benchmarks for perceivable, operable, understandable, and robust digital systems."
  },
  {
    id: "eeoc-ada",
    name: "EEOC ADA Guidance",
    fullName: "U.S. Equal Employment Opportunity Commission ADA Division",
    capability: "Authoritative legal standards for the interactive accommodation process, undue hardship definitions, and worker rights under Title I.",
    domains: ["legal-rights", "workplace-policy", "interactive-process"],
    targetAudience: ["workers", "hr-professionals", "legal-counsel"],
    url: "https://www.eeoc.gov/laws/guidance/workplace-accommodations-low-vision-and-blindness",
    evidenceNotes: "Enforcing body for Title I of the Americans with Disabilities Act."
  },
  {
    id: "resna",
    name: "RESNA",
    fullName: "Rehabilitation Engineering and Assistive Technology Society of North America",
    capability: "Credentialed Assistive Technology Professionals (ATP), technical standards for adaptive hardware, seating, and computer access.",
    domains: ["assistive-technology", "physical-ergonomics", "wheelchair-mobility", "speech-generating"],
    targetAudience: ["clinicians", "engineers", "rehabilitation-specialists"],
    url: "https://www.resna.org",
    evidenceNotes: "Leading professional body for rehabilitation engineering and assistive technology certification."
  },
  {
    id: "vocational-rehabilitation",
    name: "State Vocational Rehabilitation (VR)",
    fullName: "Council of State Administrators of Vocational Rehabilitation (CSAVR)",
    capability: "Public vocational counseling, funded adaptive equipment evaluations, job coaching, and workplace barrier assessments.",
    domains: ["career-counseling", "funding", "workplace", "assistive-tech-procurement"],
    targetAudience: ["individuals-with-disabilities", "students-in-transition"],
    url: "https://www.csavr.org",
    evidenceNotes: "Federally mandated and state-administered rehabilitation services offering direct funding and individualized plans for employment (IPE)."
  },
  {
    id: "cast-udl",
    name: "CAST / UDL Guidelines",
    fullName: "Center for Applied Special Technology (Universal Design for Learning)",
    capability: "Framework for designing flexible learning and training environments that accommodate individual learning differences.",
    domains: ["education", "cognitive-accessibility", "training-systems"],
    targetAudience: ["educators", "instructional-designers", "workplace-trainers"],
    url: "https://udlguidelines.cast.org",
    evidenceNotes: "Pioneering research-backed framework for multiple means of engagement, representation, and action."
  },
  {
    id: "assistive-technology",
    name: "Assistive Technology Providers & Makers",
    fullName: "Assistive Technology Industry & Community Makerspaces (e.g. Makers Making Change)",
    capability: "Commercial adaptive peripherals, low-cost open-source 3D-printed tool adaptations, and custom physical fixtures.",
    domains: ["hardware-prototyping", "adaptive-tools", "3d-printing"],
    targetAudience: ["occupational-therapists", "end-users", "makers"],
    url: "https://www.makersmakingchange.com",
    evidenceNotes: "Bridging clinical rehabilitation needs with accessible open-source physical manufacturing."
  },
  {
    id: "accessibility-professional",
    name: "IAAP (Accessibility Professionals)",
    fullName: "International Association of Accessibility Professionals",
    capability: "Certified Professionals in Accessibility Core Competencies (CPACC) and Web Accessibility Specialists (WAS) for organizational strategy.",
    domains: ["organizational-strategy", "auditing", "built-environment"],
    targetAudience: ["enterprises", "universities", "public-sector"],
    url: "https://www.accessibilityassociation.org",
    evidenceNotes: "Global professional association certifying accessibility specialists."
  },
  {
    id: "developer-coding-agent",
    name: "Developers / AI Coding Agents",
    fullName: "Software Engineers and Automated AI Engineering Agents",
    capability: "Rapid generation of accessible web components, custom CSS user-styles, browser extensions, and focus tools.",
    domains: ["software-engineering", "rapid-prototyping", "custom-scripting"],
    targetAudience: ["end-users", "development-teams"],
    url: "https://github.com",
    evidenceNotes: "Direct execution surface for digital accommodations and accessible tool builds."
  }
];

export function findResourceById(id) {
  return resourceCategories.find((res) => res.id === id);
}

export function findResourcesByDomain(domain) {
  return resourceCategories.filter((res) => res.domains && res.domains.includes(domain));
}

export function matchResourcesForCase(solutionResourceCategories = [], functionalKeywords = []) {
  const directMatches = resourceCategories.filter((res) => solutionResourceCategories.includes(res.id));
  const keywordMatches = resourceCategories.filter((res) => {
    if (directMatches.some((m) => m.id === res.id)) return false;
    return res.domains.some((dom) => functionalKeywords.some((kw) => dom.toLowerCase().includes(kw.toLowerCase())));
  });
  return [...directMatches, ...keywordMatches];
}
