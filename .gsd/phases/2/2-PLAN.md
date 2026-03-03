# Phase 2 Plan: Contributor Data & State Management

## Objective
Develop the state layer to manage an array of contributors and their selected CRediT roles. Build the basic UI form components to Add, Edit, and Remove names, as well as select roles. Ensure that the data is persisted across browser reloads using `localStorage`.

## Context
Refactoring in Phase 1 setup the basic app structure and a Builder tab. We now need to populate that Builder tab with the interactive form that users will use to assemble their CRediT taxonomy lists, as per REQ-03, REQ-04, REQ-05.

---

## Tasks

### Task 2.1: State Management Hook & Types
**Goal**: Create a reliable data layer to manage the contributors.
- **Action**: Update `types.ts` (or equivalent) to export a `Contributor` interface (needs `id`, `name`, `roles: string[]`).
- **Action**: Create `src/hooks/useBuilderState.ts` (or simply `hooks/useBuilderState.ts`) providing state manipulation actions: `addContributor`, `removeContributor`, `updateContributorName`, `toggleContributorRole`, and `clearAll`.
- **Action**: Use `useEffect` inside the hook to sync the `contributors` state array with browser `localStorage`.
- **Requirements**: Fast, synchronous updates. A custom hook using `useState` is sufficient.

### Task 2.2: Contributor Block Components
**Goal**: Create the UI primitives for selecting CRediT Roles and editing individual contributors.
- **Action**: Create `components/builder/RoleChip.tsx` — A small, accessible selectable button for a single CRediT role. Should display the role name (and optionally an icon), with distinct "selected" vs "unselected" visual states matching the Phase 1 aesthetic.
- **Action**: Create `components/builder/ContributorCard.tsx` — A card component representing a single author. Contains a text input for their name, a delete button, and a responsive flex-container/grid of all 14 `RoleChip`s.

### Task 2.3: Builder Dashboard & Form Integration
**Goal**: Assemble the Contributor list into a coherent interface inside the new tab.
- **Action**: Create `components/builder/BuilderView.tsx` which consumes the `useBuilderState` hook.
- **Action**: Add a sticky generic "Add Contributor" button/form at the top of `BuilderView`.
- **Action**: Render the mapped list of `ContributorCard`s below the form. Wrap them in Framer Motion `<AnimatePresence>` for smooth enter/exit transitions.
- **Action**: Integrate `BuilderView.tsx` into `App.tsx` replacing the placeholder "Coming Soon" section under the `builder` activeTab branch.

---

## Verification
1. Open the "CRediT Builder" tab.
2. Click "Add Contributor" to create a new entry.
3. Edit the contributor's name, ensure focus isn't lost during keystrokes.
4. Toggle roles on that contributor and observe immediate UI feedback on the chips.
5. Refresh the page: Ensure the added contributor and their selected roles are restored from memory.
6. Check the UI aesthetic matches the high-quality design established in Phase 1 (smooth hover transitions, elegant focus rings).
