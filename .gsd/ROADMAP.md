# ROADMAP.md

> **Current Phase**: 1
> **Milestone**: v2.0 (Builder Integration)

## Must-Haves (from SPEC)
- [x] Refactor existing code for cleaner architecture and premium UI/UX.
- [x] Implement robust Form and State layer for contributor definitions.
- [x] Implement Matrix & List view modes matching the 5 requested variations.
- [ ] Add JSON Export and Copy to Clipboard implementations.

## Phases

### Phase 1: Codebase Refactor & Design System
**Status**: ✅ Complete
**Objective**: Clean up `App.tsx` and structure components logically. Establish a clear UI system (typography, spacing, interactive states) for the new "premium" feel.
**Requirements**: REQ-01, REQ-02

### Phase 2: Contributor Data & State Management
**Status**: ✅ Complete
**Objective**: Develop the React context / state structures to manage an array of contributors and their selected CRediT roles. Build the form components to Add/Edit/Remove names.
**Requirements**: REQ-03, REQ-04, REQ-05

### Phase 3: The Builder Views (5 Modes)
**Status**: ✅ Complete
**Objective**: Implement the visualization core containing the 5 different layouts. Wire this up to read directly from the state established in Phase 2.
**Requirements**: REQ-07

### Phase 4: Output Export & Polish
**Status**: ⬜ Not Started
**Objective**: Implement "Copy" and "Download JSON" functionalities. Perform final QA on UX transitions, ensuring accessibility, aesthetics, and bug-free interactions.
**Requirements**: REQ-06
