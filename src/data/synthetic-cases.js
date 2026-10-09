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
        evidence: [],
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
        evidence: [],
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
        evidence: [],
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
        evidence: [],
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
        evidence: [],
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
        evidence: [],
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
        evidence: [],
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
        evidence: [],
        resourceCategories: ["assistive-technology", "accessibility-professional"]
      }
    ]
  }
];
