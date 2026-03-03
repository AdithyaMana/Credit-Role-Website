# Phase 3 Plan: The Builder Views (5 Modes)

## Objective
Implement the visualization core displaying the outputs of the Contributor Data gathered in Phase 2. We need to create a robust toggling system to switch between 5 precise views: Matrix (Roles vs Authors), Table Config, Inline Matrix (Red Theme), List Mode by Author, and List Mode by Role.

## Context
With the `useBuilderState` complete and `ContributorCard` working, we now have data structured as `Author -> [Roles]`. We must take this data and render it dynamically into final presentable assets the user will eventually export.

---

## Tasks

### Task 3.1: View Toggle System
**Goal**: Create a state and UI component within `BuilderView.tsx` (or a sub-component child) to switch between the 5 view modes.
- **Action**: Create an enum/type `ViewMode` with five modes: `MATRIX`, `TABLE`, `INLINE_MATRIX`, `LIST_AUTHOR`, `LIST_ROLE`.
- **Action**: Implement a styled tab toggle or dropdown in `BuilderView.tsx` right below or beside the "Clear All/Export" buttons. This will dictate which of the 5 display components renders.

### Task 3.2: Matrix View & Table Config
**Goal**: Implement the two core grid views.
- **Action**: Create `components/builder/views/MatrixView.tsx` — A grid where Rows = Authors and Columns = the 14 CRediT Roles. Use icons/checks for cells where the author has the role. Add subtle hover states or zebra-striping. This view should resemble the sleek aesthetic from the Phase 1 visualizer.
- **Action**: Create `components/builder/views/TableView.tsx` — A strictly tabular, more formal representation (perhaps with borders and formal text headers rather than just icons) that mirrors how it might appear in traditional print or journal publications.

### Task 3.3: Inline Matrix (Red)
**Goal**: Implement the specialized "Inline Matrix" with a distinct red aesthetic.
- **Action**: Create `components/builder/views/InlineMatrixView.tsx` — A condensed, inline-grid matrix optimized for dense layout, using red highlights/accents for active roles (as requested by the user's specific instruction).

### Task 3.4: List Views
**Goal**: Implement text-heavy list views, commonly used in author acknowledgments.
- **Action**: Create `components/builder/views/AuthorListView.tsx` — Groups by Author first. For each author, lists their roles as a comma-separated string or bulleted list.
  Example: "Jane Doe: Conceptualization, Data Curation, Formal Analysis."
- **Action**: Create `components/builder/views/RoleListView.tsx` — Groups by Role first. For each role, lists the authors who contributed to it. This requires a small data transformation step (`memo`ized).
  Example: "Conceptualization: Jane Doe, John Smith."

### Task 3.5: Component Integration
**Goal**: Hook up all 5 views to the `BuilderView` interface.
- **Action**: Render the active view component inside a new "Output Preview" section at the bottom of the Builder tab.
- **Action**: Ensure all 5 components gracefully handle the empty state (`contributors.length === 0`).

---

## Verification
1. Add contributors and assign roles.
2. Toggle between all 5 view modes. Ensure each renders correctly without crashing.
3. Verify `RoleListView` correctly transforms the data (mapping Roles -> Authors).
4. Verify `AuthorListView` correctly maps Authors -> Roles.
5. Verify `InlineMatrixView` uses the requested red styling distinct from the base pastel styles.
6. Ensure responsive layout (scrollable on mobile if data is too wide).
