---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Codebase Refactor and Tailwind Integration

## Objective
Convert from the CDN/import-map hack to a proper Vite + TailwindCSS toolchain. Reorganize components into feature folders, and set up a tabbed layout in `App.tsx` to seamlessly host the existing Visualizer alongside the upcoming Builder.

## Context
- .gsd/SPEC.md
- index.html
- package.json
- App.tsx
- components/

## Tasks

<task type="auto">
  <name>Setup Proper Tailwind CSS configuration</name>
  <files>index.html, package.json, tailwind.config.js, src/index.css</files>
  <action>
    - Install `tailwindcss`, `postcss`, and `autoprefixer` using npm.
    - Initialize `tailwind.config.js` and `postcss.config.js`.
    - Create `src/index.css` (or simply `index.css`) containing the `@tailwind` directives.
    - Remove the `<script src="https://cdn.tailwindcss.com"></script>`, Tailwind script configs, and the `<script type="importmap">` hack from `index.html`.
    - Update `index.tsx` to import the new `index.css` file.
  </action>
  <verify>npm run build</verify>
  <done>Tailwind compiles natively through Vite and the index.html is clean.</done>
</task>

<task type="auto">
  <name>Component Hierarchy Refactor</name>
  <files>App.tsx, components/*</files>
  <action>
    - Group existing components logically. Create `components/visualizer` for `HexGrid`, `Hexagon`, `DetailPanel`, and `MockPublicationTable`. Create `components/modals` for `ShowcaseModal` and `AboutModal`.
    - Update imports in `App.tsx` and all internally referencing components to match the new structure.
    - Create a barebones top navigation or tab switcher in `App.tsx` (e.g. "Taxonomy Visualizer" vs "CRediT Builder"). Make the default view the "Builder" (currently empty) so we can build into it in Phase 2.
    - Tidy up code style across the files while migrating them, removing obsolete variables and adopting strict React standard practices.
  </action>
  <verify>npm run build</verify>
  <done>Code compiles with the new folder structure and displays a view switcher shell.</done>
</task>

## Success Criteria
- [ ] Tailwind is bundled properly via PostCSS without any CDN runtime.
- [ ] Components directory is separated into contextual modules (Visualizer vs Modals etc.).
- [ ] App.tsx acts as a router/switcher between the original Visualizer view and an empty Builder view placeholder.
