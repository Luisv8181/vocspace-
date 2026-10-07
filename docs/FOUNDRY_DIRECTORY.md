# Accommodation Foundry Directory

Suggested repository structure for the future implementation.

```text
foundry/
├── projects/
│   └── <project-id>/
│       ├── problem.md
│       ├── functional-model.json
│       ├── design-options.json
│       ├── simulation/
│       ├── prototype/
│       ├── tests/
│       ├── safety-review.md
│       └── handoff/
├── patterns/
│   ├── digital/
│   ├── physical/
│   ├── hybrid/
│   └── environmental/
├── simulations/
│   ├── blender/
│   ├── physics/
│   └── interaction/
├── components/
│   ├── web/
│   ├── 3d-print/
│   └── embedded/
├── evidence/
├── datasets/
└── protocols/
```

This is a target architecture, not a requirement to create the complete implementation immediately.

The repository should prefer small, composable artifacts that can be consumed by both humans and specialized agents.