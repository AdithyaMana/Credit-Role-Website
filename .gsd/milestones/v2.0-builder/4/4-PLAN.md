# Phase 4 Plan: Output Export & Polish

## Objective
Implement "Copy to Clipboard" and "Download JSON" functionalities so users can actually use their built taxonomy data. Complete the final QA and UI polish.

## Context
With the Builder views correctly rendering the contributor roles, the user needs a way to extract this data. The "Export Roles" button is currently a placeholder. We will wire it up to generate a highly structured JSON file and provide simple clipboard exports.

---

## Tasks

### Task 4.1: Export Logic Utilities
**Goal**: Create pure functions to handle data serialization and browser download mechanisms.
- **Action**: Create `lib/exportUtils.ts` (or put it in a utility folder).
- **Action**: Implement `downloadAsJson(contributors: Contributor[])`. This should generate a clean, mapped array displaying the Author names and their resolved string role titles, create a Blob, and trigger an automatic download using an anchor tag.
- **Action**: Implement `copyToClipboard(contributors: Contributor[], viewMode: string)` that formats the current view into text (or at least copies the JSON/List formats as raw text) and uses `navigator.clipboard.writeText(...)` to place it on the user's clipboard.

### Task 4.2: Export Modal / UI Integration
**Goal**: Hook up the Export UI in `BuilderView.tsx`.
- **Action**: Update the "Export Roles" button in `BuilderView.tsx` to either directly trigger the download, or open a small `ExportModal.tsx` / Dropdown menu with discrete options: "Download JSON" and "Copy to Clipboard".
- **Action**: Add a temporary success indicator (like a "Copied!" text change or small toast) when the user successfully copies.

### Task 4.3: Final UI Polish & QA
**Goal**: Review entire workflow and patch any visual or interaction quirks.
- **Action**: Ensure empty states are welcoming and visually balanced.
- **Action**: Test scrolling on very large contributor lists to ensure the headers stick correctly and scrolling feels native.
- **Action**: Confirm that the overall aesthetics match the premium vibe dictated in Phase 1 (smooth hover transitions, cohesive color palettes).

---

## Verification
1. Click the Export button.
2. Select "Download JSON" -> verify a `.json` file downloads containing accurate mappings.
3. Select "Copy to Clipboard" -> paste into a text editor and ensure the raw text makes sense.
4. Double check the entire app layout on both the Visualizer and Builder tabs looking for any broken styling.
