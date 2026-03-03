# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
A visually appealing, user-friendly tool to assign and visualize CRediT (Contributor Roles Taxonomy) roles for academic contributors. It will feature a significantly refactored, maintainable codebase, a polished user experience, and a new robust "Builder" tool with 5 distinct visualization modes for generating journal-ready contributor data.

## Goals
1. Refactor the existing codebase for maintainability, readability, and to remove redundant or bad code.
2. Improve the overall application UI/UX, ensuring a premium feel and smooth interactions.
3. Implement a new "Contributor Builder" tool supporting:
   - Contributor name input.
   - Role selection (via checkboxes or chips for all 14 CRediT roles).
   - Role persistence (storing the name-to-role mappings).
4. Implement 5 distinct visualization modes for the generated data:
   - Matrix View (Roles as rows, Authors as columns with icons)
   - Table View (Roles with comma-separated authors)
   - Inline Matrix View (Alternative matrix styling)
   - Author-List View (Author mapped to their roles)
   - Role-List View (Role mapped to the authors)
5. Provide a JSON Export and "Copy to Clipboard" functionality to get the data in standard journal formats.

## Non-Goals (Out of Scope)
- Backend or database storage (all persistence is local/in-memory/local-storage for this static app).
- Authentication or user accounts.

## Users
Academic researchers, principal investigators, and journal editors who need to easily generate and format CRediT role statements for publications without manual formatting errors.

## Constraints
- Must be a client-side static application.
- Uses the 14 standard CRediT roles exactly.

## Success Criteria
- [ ] Codebase is modular and redundant code is removed.
- [ ] UI is polished and responsive.
- [ ] Users can add multiple contributors and assign them any of the 14 roles.
- [ ] Users can toggle between 5 exact views of the contributor data.
- [ ] Users can copy the formatted data or export it to JSON.
