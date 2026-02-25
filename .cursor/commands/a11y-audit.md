# A11y Audit

Scan for accessibility problems and WCAG AA violations, then fix them. Every issue found is a real user blocked.

## MANDATORY PREPARATION

### Context Gathering (Do This First)

You cannot do a great audit without understanding what you're auditing. Attempt to gather the following from the current thread or codebase:

1. **Scope**: What should be audited? If not specified, ask:
   - Current file
   - A specific component or directory (provide path)
   - Entire project

2. **User context**: Who uses this product? Are there known assistive technology users, or is this a public-facing product that must meet legal compliance (ADA, EAA, EN 301 549)?

3. **Priority**: Fix everything, or triage and fix critical issues only?

If you cannot infer scope or priority with high confidence, **STOP and ask the user directly before proceeding**. Auditing the wrong scope wastes time. Fixing the wrong things first can introduce regressions.

### Use the a11y Skill

Use the a11y skill (`a11y.md`) for patterns, ARIA rules, keyboard behavior, and WCAG requirements. Do NOT proceed until it has executed and you know all the DO's and DON'Ts.

---

## Assess Current State

Analyze the code across every category below. Don't skim — the worst issues are often invisible at a glance.

### 1. Semantic HTML
- Interactive elements built from `<div>`, `<span>`, or `<p>` with click handlers — must be `<button>` or `<a>`
- `<a>` tags without `href`, or used to trigger JS rather than navigate — use `<button>`
- Missing landmark elements: `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>`
- Headings that skip levels (h1 → h3) or are chosen for visual size rather than document structure
- Data grids or tables built from divs
- `<fieldset>` + `<legend>` missing for grouped fields (radio groups, checkboxes, address blocks)

### 2. ARIA Usage
- `role="button"` on non-`<button>` elements — ARIA adds semantics, not behavior
- ARIA widget roles (`role="tab"`, `role="listbox"`, etc.) without matching keyboard behavior
- `aria-hidden="true"` on elements containing focusable children — traps focus invisibly
- `aria-expanded`, `aria-selected`, `aria-checked` not toggling with state changes
- `aria-describedby` or `aria-labelledby` pointing to IDs that don't exist in the DOM
- Live regions (`aria-live`, `role="alert"`, `role="status"`) injected into the DOM wholesale — must pre-exist with content swapped in
- `role="alert"` overused for non-urgent messages — use `role="status"` or `aria-live="polite"` instead

### 3. Keyboard Support
- Custom components (dropdowns, modals, tabs, date pickers) with no keyboard handler
- Missing `Escape` handler on modals, popovers, and menus
- Arrow key navigation missing for tab lists, radio groups, listboxes, menus
- `tabindex` values greater than 0 — breaks natural tab order, almost always wrong
- Interactive elements reachable only via mouse (hover-only menus, drag-only interactions)
- `onmousedown` or `onmouseover` used for functionality without keyboard equivalent

### 4. Focus Management
- Modals and drawers that don't trap focus — user can tab behind the overlay
- Modals that don't return focus to the triggering element on close
- SPA route changes that don't move focus to the page heading or `<main>`
- Error messages that appear but don't receive focus or announce via live region
- `outline: none` or `outline: 0` without a `:focus-visible` replacement
- Focus that lands on a non-visible or non-existent element

### 5. Forms
- `<input>`, `<select>`, or `<textarea>` without an associated `<label>`
- Placeholder text used as the only label — disappears on input, fails contrast
- Error messages not associated with their field via `aria-describedby`
- `aria-invalid` not set on fields with validation errors
- `required` or `aria-required` missing on required fields
- Validation firing on every keystroke rather than on blur

### 6. Images and Media
- `<img>` missing the `alt` attribute entirely (different from `alt=""`)
- Informative images with empty `alt=""` or generic alt text ("image", "photo", "icon")
- Decorative images with descriptive alt text (creates noise)
- Icon-only buttons without `aria-label` or visually hidden text
- Inline SVGs missing `aria-hidden="true"` when decorative
- Video without captions or a caption track
- `autoplay` with sound

### 7. Color and Contrast
- Text contrast below 4.5:1 (body) or 3:1 (large text: 18px+ or 14px bold)
- UI components (borders, input outlines, icons) below 3:1 against adjacent background
- Placeholder text — almost always fails; needs 4.5:1
- Information conveyed by color alone (red = error) with no icon, label, or pattern
- Focus rings that fail 3:1 against adjacent colors

### 8. Responsive and Zoom
- `user-scalable=no` or `maximum-scale=1` in the viewport meta — breaks browser zoom, fails WCAG
- Content that overflows or truncates at 200% browser zoom
- `px` units for body text — use `rem` to respect user browser settings
- Touch targets smaller than 44×44px

### 9. Motion
- Animations with no `@media (prefers-reduced-motion: reduce)` fallback
- Autoplaying animations longer than 5 seconds with no pause control
- Content that flashes more than 3 times per second (WCAG 2.3.1, Level A — seizure risk)

### 10. Page-Level
- Missing or incorrect `<html lang="...">` attribute
- `<title>` that doesn't describe the current page
- Skip link missing or not shown on focus
- Multiple `<h1>` elements on a single page view

---

## Triage Findings

Classify every issue before touching any code:

**🔴 Critical** — WCAG A/AA failure or severe barrier that blocks users entirely
- Missing labels, keyboard traps, `outline: none` with no replacement, color-only error states, `user-scalable=no`, missing `alt`, interactive divs, focus disappearing

**🟡 Serious** — Best practice violation likely to affect users in meaningful ways
- Missing live regions, no focus return from modals, `tabindex > 0`, no reduced-motion support, placeholder-only labels, SVGs missing `aria-hidden`, validation on keystroke

**🔵 Minor** — Robustness and polish improvements
- Redundant ARIA, suboptimal announcements, missing skip links, improvement opportunities that don't block users

**CRITICAL**: Fix 🔴 issues first, always. Don't start on 🟡 until all 🔴 items are resolved.

---

## Fix Issues

Work through findings by severity. For each fix:

- Make the minimal change that resolves the issue — don't refactor unrelated code
- Verify the fix doesn't introduce a new issue (e.g. adding `aria-label` that contradicts visible text)
- Note any fixes that require runtime or browser testing to fully verify (contrast on dynamic backgrounds, focus order in SPAs, screen reader announcement timing)

**NEVER**:
- Remove functionality in the name of simplification — accessibility is additive
- Use ARIA as a substitute for correct semantic HTML
- Add `aria-label` that contradicts or duplicates visible text
- Use `role="alert"` for routine, non-urgent updates
- Inject live regions dynamically — they must pre-exist in the DOM
- Use `tabindex > 0` to fix focus order — fix the DOM order instead
- Treat automated scan results as complete — tools catch ~30-40% of real issues
- Mark an issue resolved without verifying keyboard and screen reader behavior

---

## Verify Fixes

After making changes, confirm:

- **Keyboard**: Tab through every interactive element in the affected scope. Can you reach it? Use it? Is focus always visible?
- **Focus order**: Does tab order match visual/logical reading order?
- **Screen reader**: Announce the affected components with VoiceOver (macOS) or NVDA (Windows). Are labels, states, and errors read correctly?
- **Zoom**: Does the layout hold at 200% browser zoom?
- **Reduced motion**: Do animations respect `prefers-reduced-motion`?
- **Automated rescan**: Run axe DevTools after fixes. Zero violations is the baseline, not the goal.

---

## Report

Summarize findings and fixes in this format:

```
## A11y Audit: [scope]

### 🔴 Critical ([n] found, [n] fixed)
- [File:line] **Issue**: description
  **Fix applied**: what was changed

### 🟡 Serious ([n] found, [n] fixed)
- [File:line] **Issue**: description
  **Fix applied**: what was changed

### 🔵 Minor ([n] found, [n] fixed)
- [File:line] **Issue**: description
  **Fix applied**: what was changed

### ✅ Passing
- [Specific things the code is doing correctly]

### ⚠️ Needs Manual Verification
- [Issues that require browser/screen reader testing to fully confirm]

---
**Summary**: X critical, Y serious, Z minor issues. A fixed, B need manual verification.
```

Remember: Accessibility is not a checklist — it's the floor, not the ceiling. Every issue left unfixed is a real person blocked from using something you built. Fix what you find, note what needs human verification, and never mistake "passes axe" for "accessible."
