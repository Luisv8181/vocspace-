export const syntheticCases = [
  {
    id: "case-cognitive-load-001",
    title: "High information density at work",
    participationGoal: "Complete computer-based administrative work independently.",
    task: "Review incoming information, prioritize tasks, and complete documentation.",
    context: "Open-plan office with frequent digital notifications and multiple browser windows.",
    barrier: "High information density and frequent interruptions make it difficult to maintain task focus.",
    functionalNeed: "Reduce unnecessary cognitive load and improve task continuity.",
    strengths: ["Strong domain knowledge", "Uses written checklists", "Can complete tasks independently in low-distraction conditions"],
    constraints: ["Must use existing employer systems", "Team communication must remain available"],
    solutions: [
      {
        id: "solution-focus-mode",
        name: "Focus-oriented workspace",
        type: "digital",
        mechanism: "Reduce visual clutter and surface only task-relevant information during focused work.",
        rationale: "Targets information density and attentional switching without removing required systems.",
        tradeoffs: ["Requires configuration", "Notifications may need a separate escalation pathway"],
        implementationDifficulty: "medium",
        evidence: ["JAN Attention Deficit Disorder Series"],
        resourceCategories: ["accessibility-professional", "developer-coding-agent"]
      },
      {
        id: "solution-interruption-protocol",
        name: "Structured interruption protocol",
        type: "organizational",
        mechanism: "Create agreed rules for when and how non-urgent interruptions occur.",
        rationale: "Changes the surrounding workflow rather than requiring the worker to compensate alone.",
        tradeoffs: ["Requires team agreement", "May not fit urgent-response roles"],
        implementationDifficulty: "low",
        evidence: ["Occupational Health Psychology Focus Interventions"],
        resourceCategories: ["vocational-rehabilitation", "accessibility-professional"]
      },
      {
        id: "solution-task-board",
        name: "Persistent task recovery board",
        type: "digital",
        mechanism: "Maintain a visible next-action state and interruption recovery point.",
        rationale: "Supports resuming the correct task after context switching.",
        tradeoffs: ["Adds a small documentation step", "Must be designed to avoid becoming extra cognitive load"],
        implementationDifficulty: "low",
        evidence: ["Cognitive Ergonomics Task Continuity Model"],
        resourceCategories: ["developer-coding-agent"]
      }
    ]
  },
  {
    id: "case-web-navigation-002",
    title: "Losing orientation on a complex website",
    participationGoal: "Find and complete services on a public website independently.",
    task: "Navigate several pages, locate information, and complete a multi-step form.",
    context: "Dense website with changing menus, repeated content, and long pages.",
    barrier: "The user loses track of location and next steps while navigating.",
    functionalNeed: "Provide stronger orientation, predictable navigation, and recoverable task progression.",
    strengths: ["Can understand written instructions when presented clearly", "Comfortable with basic web browsing"],
    constraints: ["Must use public website", "No special software assumed"],
    solutions: [
      {
        id: "solution-progressive-navigation",
        name: "Progressive disclosure and task steps",
        type: "digital",
        mechanism: "Reduce visible complexity and reveal the next relevant action progressively.",
        rationale: "Reduces navigation burden and supports task sequencing.",
        tradeoffs: ["Can hide useful context if over-simplified"],
        implementationDifficulty: "medium",
        evidence: ["W3C COGA Usable Guidance"],
        resourceCategories: ["techa11y", "accessibility-professional", "developer-coding-agent"]
      },
      {
        id: "solution-persistent-orientation",
        name: "Persistent location and progress cues",
        type: "digital",
        mechanism: "Keep current location, task stage, and recovery options visible.",
        rationale: "Addresses loss of orientation directly.",
        tradeoffs: ["Requires careful responsive design", "Too many cues can add clutter"],
        implementationDifficulty: "medium",
        evidence: ["WCAG 2.2 Success Criterion 2.4.8 Location"],
        resourceCategories: ["techa11y", "developer-coding-agent"]
      },
      {
        id: "solution-reading-mode",
        name: "Reduced-distraction reading mode",
        type: "digital",
        mechanism: "Present the task-relevant content with reduced visual competition.",
        rationale: "Can support users who struggle with dense presentation.",
        tradeoffs: ["May remove contextual information", "Requires testing with assistive technology"],
        implementationDifficulty: "medium",
        evidence: ["W3C COGA Design Patterns"],
        resourceCategories: ["techa11y", "developer-coding-agent"]
      }
    ]
  },
  {
    id: "case-tool-grip-003",
    title: "Difficulty maintaining grip on a standard tool",
    participationGoal: "Use a common hand tool for a short work task.",
    task: "Hold, position, and operate a handheld tool repeatedly.",
    context: "Light-duty work where the existing tool handle is narrow and smooth.",
    barrier: "The standard handle requires more sustained grip effort than the person can comfortably maintain.",
    functionalNeed: "Reduce grip demand while preserving control and task accuracy.",
    strengths: ["Good task understanding", "Can operate the tool with adapted positioning"],
    constraints: ["Tool dimensions", "Low-cost materials preferred", "Prototype must not create new pinch hazards"],
    solutions: [
      {
        id: "solution-grip-adapter",
        name: "Ergonomic grip adapter",
        type: "physical",
        mechanism: "Increase contact area and alter the handle geometry to reduce sustained grip demand.",
        rationale: "Changes the mechanical interface between hand and tool.",
        tradeoffs: ["Must fit securely", "Material and dimensions require testing"],
        implementationDifficulty: "medium",
        evidence: ["Ergonomic Tool Design Guidelines (Eastman Kodak)"],
        resourceCategories: ["assistive-technology", "vocational-rehabilitation"]
      },
      {
        id: "solution-custom-tool",
        name: "Alternative handle geometry",
        type: "physical",
        mechanism: "Redesign the handle based on the task and functional requirements.",
        rationale: "May provide better control than modifying the original handle.",
        tradeoffs: ["Higher prototyping cost", "May require engineering review"],
        implementationDifficulty: "high",
        evidence: ["RESNA Rehabilitation Engineering Compendium"],
        resourceCategories: ["assistive-technology", "accessibility-professional"]
      }
    ]
  },
  {
    id: "case-sensory-photophobia-004",
    title: "Glare and severe photophobia under fluorescent office lighting",
    participationGoal: "Perform extended data auditing and spreadsheet analysis without triggering photophobic migraines.",
    task: "Review dense multi-column financial records on dual 27-inch monitors throughout the workday.",
    context: "Corporate office with overhead 5000K fluorescent troffers directly above the employee workstation and window glare.",
    barrier: "High ambient luminous glare and unshielded overhead light trigger severe ocular strain, headaches, and visual fatigue within 60 minutes.",
    functionalNeed: "Reduce harsh overhead luminous intensity and glare while maintaining sufficient contrast for data verification.",
    strengths: ["Expert financial auditor", "High numerical accuracy when visual conditions are optimized", "Proactive in testing software contrast settings"],
    constraints: ["Cannot rewire ceiling fixtures for the entire department", "Coworkers in adjacent cubicles require adequate ambient light"],
    solutions: [
      {
        id: "solution-cubicle-canopy-filter",
        name: "Overhead light diffuser canopy and anti-glare screen filters",
        type: "environmental",
        mechanism: "Install an overhead fabric cube-shield/canopy to block direct troffer rays and apply polarized matte filters to monitors.",
        rationale: "Eliminates direct glare vector and specular reflections without affecting neighboring coworkers.",
        tradeoffs: ["Requires facilities approval for fire-code compliant materials", "Does not eliminate side ambient glare"],
        implementationDifficulty: "low",
        evidence: ["JAN Migraine Accommodation Guide", "OSHA Computer Workstations Lighting Checklist"],
        resourceCategories: ["jan", "assistive-technology"]
      },
      {
        id: "solution-high-contrast-dark-theme",
        name: "System-wide high contrast warm color palette and FL-41 lenses",
        type: "digital",
        mechanism: "Configure operating system and spreadsheet applications with dark/amber themes, supplemented with FL-41 precision-tinted lenses.",
        rationale: "Dramatically reduces total photon emission entering the eye during 8 hours of screen time.",
        tradeoffs: ["Some enterprise legacy apps fail to render clean dark modes", "FL-41 tint slightly alters color perception"],
        implementationDifficulty: "low",
        evidence: ["American Academy of Ophthalmology Photophobia Interventions"],
        resourceCategories: ["developer-coding-agent", "accessibility-professional"]
      },
      {
        id: "solution-perimeter-relocation",
        name: "Workstation relocation to low-lumens perimeter zone",
        type: "organizational",
        mechanism: "Relocate the desk to an indirect lighting corner or allow partial remote days during high-intensity audit weeks.",
        rationale: "Solves the environmental root cause at zero equipment cost.",
        tradeoffs: ["May distance worker from direct physical team collaboration"],
        implementationDifficulty: "low",
        evidence: ["EEOC Reasonable Accommodations for Migraine Conditions"],
        resourceCategories: ["vocational-rehabilitation", "jan"]
      }
    ]
  },
  {
    id: "case-motor-rsi-005",
    title: "Severe repetitive strain injury (RSI) during code authoring and document writing",
    participationGoal: "Author technical documentation and code without triggering acute median nerve inflammation and wrist numbness.",
    task: "Type 4,000+ words of prose and code per day while navigating complex IDE debuggers.",
    context: "Standard corporate workstation equipped with flat membrane keyboard and standard optical mouse.",
    barrier: "Repetitive keystrokes and sustained wrist pronation cause severe bilateral forearm tendinitis, limiting continuous manual typing to under 15 minutes.",
    functionalNeed: "Enable hands-free digital input and zero-strain pointer navigation without sacrificing typing accuracy or technical syntax speed.",
    strengths: ["Extremely clear verbal communicator", "Deep mental model of code architecture", "Highly disciplined with micro-break regimens"],
    constraints: ["Open-space noise levels make loud dictation problematic", "Must maintain velocity on confidential codebases"],
    solutions: [
      {
        id: "solution-voice-coding-stack",
        name: "Offline speech-to-code dictation engine with directional microphone",
        type: "digital",
        mechanism: "Deploy a local, low-latency speech recognition engine (e.g. Talon Voice / Whisper) paired with a noise-canceling close-talk headset.",
        rationale: "Completely offloads mechanical stress from hands to vocal phonemes while preserving strict code syntax commands.",
        tradeoffs: ["2–3 week learning curve for specialized voice grammar", "Vocal cord fatigue requires vocal pacing"],
        implementationDifficulty: "high",
        evidence: ["RESNA Computer Access Technologies for Upper Extremity Impairments"],
        resourceCategories: ["developer-coding-agent", "assistive-technology"]
      },
      {
        id: "solution-split-column-keyboard",
        name: "Ergonomic split ortholinear keyboard with foot pedal switches",
        type: "physical",
        mechanism: "Replace flat keyboard with a tented, split columnar keyboard and map Shift/Ctrl/Enter keys to foot pedals.",
        rationale: "Restores neutral forearm rotation (eliminating pronation) and removes pinky-finger reach fatigue.",
        tradeoffs: ["Hardware procurement cost", "Initial adjustment period of 5–7 days"],
        implementationDifficulty: "medium",
        evidence: ["Cornell Ergonomics Web Upper Limb Workstation Standards"],
        resourceCategories: ["assistive-technology", "vocational-rehabilitation"]
      },
      {
        id: "solution-speech-break-rotation",
        name: "Structured asynchronous review and paired programming protocol",
        type: "organizational",
        mechanism: "Shift 30% of individual typing duties to architectural pairing and asynchronous voice memo annotations.",
        rationale: "Reduces total daily mechanical keystroke volume below clinical symptom threshold.",
        tradeoffs: ["Requires scheduling alignment with team peers"],
        implementationDifficulty: "low",
        evidence: ["JAN Carpal Tunnel Syndrome Accommodation Portfolio"],
        resourceCategories: ["jan", "vocational-rehabilitation"]
      }
    ]
  },
  {
    id: "case-auditory-meeting-006",
    title: "Difficulty parsing speech in multi-speaker hybrid video meetings",
    participationGoal: "Actively participate, absorb technical decisions, and respond in cross-functional engineering scrums.",
    task: "Attend 3–4 daily video meetings with 8–15 participants, multiple speakers overlapping, and varied microphone quality.",
    context: "Remote/hybrid engineering department communicating via Microsoft Teams / Zoom.",
    barrier: "High-frequency sensorineural hearing loss makes understanding dialogue in meetings with background noise and overlapping speakers exhausting, leading to missed action items.",
    functionalNeed: "Provide real-time, synchronous visual transcription and speaker attribution with zero perceptible delay.",
    strengths: ["Strong written synthesizer", "High reading speed", "Attentive to visual documentation and chat threads"],
    constraints: ["Third-party transcription bots may violate internal corporate data security policies if cloud-hosted"],
    solutions: [
      {
        id: "solution-enterprise-live-captions",
        name: "Enterprise automated closed captions with verified speaker diarization",
        type: "digital",
        mechanism: "Enable tenant-level live automated captioning and real-time transcript streaming with speaker tags directly within the approved conferencing platform.",
        rationale: "Allows immediate visual verification of spoken words in real time without leaking audio to unvetted external services.",
        tradeoffs: ["Accuracy degrades slightly with heavy technical acronyms or strong accents"],
        implementationDifficulty: "low",
        evidence: ["WCAG 2.2 Live Captions (1.2.4)", "JAN Hearing Impairment Accommodation Series"],
        resourceCategories: ["techa11y", "developer-coding-agent"]
      },
      {
        id: "solution-agenda-first-protocol",
        name: "Pre-meeting written agenda and asynchronous chat-first Q&A protocol",
        type: "organizational",
        mechanism: "Mandate that meeting leads distribute discussion points 24 hours prior and use the in-meeting text chat for all formal questions and motions.",
        rationale: "Ensures critical information is conveyed via dual modalities (auditory + visual textual).",
        tradeoffs: ["Requires team-wide procedural adherence"],
        implementationDifficulty: "low",
        evidence: ["EEOC Hearing Disabilities in the Workplace Guidance"],
        resourceCategories: ["jan", "accessibility-professional"]
      },
      {
        id: "solution-direct-audio-telecoil",
        name: "Direct Bluetooth/telecoil audio stream integration to personal hearing instruments",
        type: "physical",
        mechanism: "Provide dedicated low-latency audio interface bridging computer output directly into personal hearing aids/cochlear implants.",
        rationale: "Bypasses ambient room reflections and PC speaker distortion entirely.",
        tradeoffs: ["Requires device compatibility check"],
        implementationDifficulty: "medium",
        evidence: ["Hearing Loss Association of America Workplace Technology Guide"],
        resourceCategories: ["assistive-technology", "vocational-rehabilitation"]
      }
    ]
  },
  {
    id: "case-adhd-taskswitching-007",
    title: "Executive dysfunction and task derailment from constant digital interruption",
    participationGoal: "Deliver deep-work technical specifications and maintain weekly project sprint deadlines consistently.",
    task: "Plan complex architecture projects while responding to routine stakeholder operational requests.",
    context: "Fast-paced corporate setting with continuous Slack pings, unexpected calendar invitations, and open-plan noise.",
    barrier: "Abrupt context-switching causes severe working-memory reset and task-initiation paralysis, resulting in erratic productivity and severe anxiety.",
    functionalNeed: "Protect continuous uninterrupted time blocks, externalize step-by-step task progression, and create predictable asynchronous communication windows.",
    strengths: ["Hyperfocus capacity on well-bounded complex problems", "Creative divergent problem solving", "Thrives when deadlines are visual and immediate"],
    constraints: ["Company expects reasonable turnaround on urgent production incidents"],
    solutions: [
      {
        id: "solution-protected-focus-blocks",
        name: "Company-calendar protected focus blocks and async SLA protocol",
        type: "organizational",
        mechanism: "Establish 3-hour morning 'quiet blocks' where Slack is set to asynchronous DND with a formal 2-hour response SLA for non-critical inquiries.",
        rationale: "Eliminates unpredictable context-switching vectors during cognitive peak hours.",
        tradeoffs: ["Requires manager buy-in and clear escalation definition for true emergencies"],
        implementationDifficulty: "low",
        evidence: ["JAN Attention Deficit / Hyperactivity Disorder Accommodation Portfolio"],
        resourceCategories: ["jan", "vocational-rehabilitation"]
      },
      {
        id: "solution-visual-task-decomposition",
        name: "Interactive micro-task visual sequencer with automated checkpoint alarms",
        type: "digital",
        mechanism: "Utilize an externalized visual breakdown tool that fragments large amorphous milestones into discrete 20-minute actionable atomic steps.",
        rationale: "Directly combats executive paralysis by lowering the cognitive activation barrier of task initiation.",
        tradeoffs: ["Initial 10-minute planning ritual required at beginning of each day"],
        implementationDifficulty: "low",
        evidence: ["ADHD in the Workplace: Evidence-Based Executive Function Interventions (Barkley)"],
        resourceCategories: ["developer-coding-agent", "cast-udl"]
      },
      {
        id: "solution-acoustic-shielding",
        name: "Over-ear active noise cancellation and designated focus pod reservation",
        type: "environmental",
        mechanism: "Furnish high-performance ANC headphones paired with reserved access to a private quiet study pod 3 days per week.",
        rationale: "Removes conversational eavesdropping cues that automatically hijack dopamine-starved attention.",
        tradeoffs: ["Requires physical space availability in the office"],
        implementationDifficulty: "medium",
        evidence: ["Society for Human Resource Management (SHRM) Neurodiversity Best Practices"],
        resourceCategories: ["assistive-technology", "accessibility-professional"]
      }
    ]
  },
  {
    id: "case-fatigue-longcovid-008",
    title: "Post-exertional malaise and cognitive stamina limits in enterprise analytics",
    participationGoal: "Sustain consistent analytical contributions without triggering debilitating multi-day symptom crashes.",
    task: "Build predictive data models, interpret customer metrics, and prepare weekly executive decks.",
    context: "Hybrid enterprise role requiring rigid 9-to-5 synchronous presence and 3 mandatory commute days.",
    barrier: "Post-viral dysautonomia and chronic fatigue syndrome cause severe cognitive brain fog and physical exhaustion when forced into continuous 8-hour sedentary blocks and transit.",
    functionalNeed: "Conserve metabolic and cognitive stamina through self-paced work hours, ergonomic rest intervals, and elimination of commute exertion.",
    strengths: ["Exceptional statistical modeling competence", "Highly organized autonomous worker", "Produces high-quality written deliverables"],
    constraints: ["Must attend weekly client presentation on Thursday afternoons"],
    solutions: [
      {
        id: "solution-telework-flexitime",
        name: "Full-time remote telework with flexible core pacing schedule",
        type: "organizational",
        mechanism: "Permit 100% remote work with split hours (e.g. 8:00–11:30 AM focus block, 2-hour biological rest buffer, 2:00–5:30 PM execution block).",
        rationale: "Eliminates the metabolic cost of physical commuting and aligns cognitive effort with diurnal stamina peaks.",
        tradeoffs: ["Less impromptu physical watercooler interaction with team"],
        implementationDifficulty: "low",
        evidence: ["EEOC Pandemic & Post-Viral Guidance", "JAN Chronic Fatigue Syndrome / ME Accommodations"],
        resourceCategories: ["jan", "eeoc-ada"]
      },
      {
        id: "solution-reclined-ergonomics",
        name: "Zero-gravity reclined workstation mount for home office",
        type: "physical",
        mechanism: "Provide articulating monitor arm and lap keyboard tray enabling 120–135 degree supine computing posture.",
        rationale: "Reduces orthostatic intolerance and improves cerebral blood flow during cognitive work.",
        tradeoffs: ["Hardware procurement and home workspace footprint"],
        implementationDifficulty: "medium",
        evidence: ["Dysautonomia International Ergonomics and Workstation Accommodations"],
        resourceCategories: ["assistive-technology", "vocational-rehabilitation"]
      },
      {
        id: "solution-async-briefings",
        name: "Recorded executive briefings and asynchronous slide handoff",
        type: "digital",
        mechanism: "Permit recording 10-minute video walkthroughs of analytics findings rather than fielding live, high-stress 60-minute Q&A interrogation sessions.",
        rationale: "Prevents acute adrenaline surges that trigger post-exertional crashes.",
        tradeoffs: ["Stakeholders must post follow-up questions in comments thread"],
        implementationDifficulty: "low",
        evidence: ["JAN Long COVID & Systemic Exertion Intolerance Guidance"],
        resourceCategories: ["developer-coding-agent", "accessibility-professional"]
      }
    ]
  }
];
