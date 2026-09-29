# Transpario Design System

**Version:** 1.0  
**Product:** Transpario  
**Domain:** transpario.page  
**Primary Motto:** KNOW BEFORE YOU APPLY.

---

# 1. Purpose

This document defines the visual language and UI rules for the Transpario website and MVP application.

The new Transpario product must feel like a direct evolution of the existing Transpario website.

The existing website is the primary visual reference.

Do not replace its identity with a generic SaaS design.

The design should preserve the existing site's:

- Black background
- White typography
- Strong uppercase headings
- Minimal editorial layout
- Thin borders
- Electric/royal blue accent
- White rectangular buttons
- Blue offset button treatment
- Strong horizontal section divisions
- Generous whitespace
- High contrast
- Slight brutalist/editorial character

---

# 2. Design Philosophy

Transpario is an information platform.

The UI should therefore prioritize:

1. Clarity
2. Trust
3. Scannability
4. Neutrality
5. Strong typography
6. Information hierarchy
7. Consistency
8. Accessibility

The design should feel:

- Serious
- Independent
- Modern
- Direct
- Structured
- Editorial
- Technical without being overly futuristic

It should NOT feel:

- Like a generic SaaS dashboard
- Like a social network
- Like a corporate HR portal
- Like a flashy startup landing page
- Like a glassmorphism template
- Like a cryptocurrency website
- Like a generic review platform

---

# 3. Existing Website Reference

The current Transpario website establishes the following visual language:

## Header

- Full-width dark/black background
- Thin bottom border
- Large centered/left-aligned Transpario wordmark
- Minimal navigation
- Uppercase/clean typography
- White CTA button
- Blue offset/shadow accent beneath CTA

## Hero

- Large uppercase heading
- Strong visual hierarchy
- Centered composition
- Muted gray supporting text
- White primary button
- Outlined secondary button
- Dark background
- Large amount of empty space

## Sections

- Black background
- Thin horizontal dividers
- Large section headings
- Small blue accent lines
- Structured cards
- Strong spacing

This visual language should be reused throughout the new product.

---

# 4. Color System

The color system should remain intentionally small.

## 4.1 Core Colors

### Background

```text
Background / Primary
#000000
```

Use for:

- Main page background
- Header
- Footer
- Hero
- Major sections

### Surface

```text
Surface / Primary
#0A0A0A
```

Use for:

- Cards
- Search areas
- Filter panels
- Secondary content containers

Do not create many different shades of black.

### Elevated Surface

```text
Surface / Elevated
#111111
```

Use sparingly for:

- Hover states
- Active cards
- Inputs
- Interactive areas

### Primary Text

```text
White
#FFFFFF
```

Use for:

- Main headings
- Important labels
- Primary content
- Primary buttons where appropriate

### Secondary Text

```text
Muted White
#A3A3A3
```

Use for:

- Supporting paragraphs
- Metadata
- Descriptions
- Secondary labels

### Tertiary Text

```text
Muted Gray
#737373
```

Use for:

- Less important metadata
- Helper text
- Dates
- Secondary UI information

---

# 5. Accent Color

The existing Transpario site uses a strong blue accent.

Use:

```text
Transpario Blue
#2563EB
```

The exact existing production color should be preferred if it can be extracted from the existing source code.

Use blue for:

- Accent lines
- Active navigation states
- Links
- Focus indicators
- Important interactive states
- Button offset/shadows
- Selected filters
- Status emphasis where appropriate

Do not use blue for every element.

The accent should remain visually meaningful.

---

# 6. Border Colors

Primary border:

```text
#2A2A2A
```

Secondary border:

```text
#1A1A1A
```

Use thin borders rather than shadows for most layout separation.

Preferred:

```css
border: 1px solid #2A2A2A;
```

Avoid:

- Heavy drop shadows
- Soft glowing borders
- Excessive gradients

---

# 7. Semantic Status Colors

The platform must remain neutral.

Status colors should support comprehension, not communicate "good" versus "bad".

## No Fee

Use a restrained positive treatment.

```text
Text: #FFFFFF
Border: #2A2A2A
Accent: existing blue system
```

Do not use bright green by default.

## Payment Required

Use neutral/high-attention treatment.

Do not use red unless a future product policy specifically requires a warning state.

The wording itself should communicate the classification.

## Optional Payment

Use neutral styling.

## Unclear

Use muted gray.

The word "Unclear" must not imply wrongdoing.

## Not Disclosed

Use muted gray.

"Not Disclosed" means Transpario does not currently have sufficient information to make a stronger classification.

---

# 8. Typography

Typography is one of the most important parts of the Transpario identity.

The existing site uses bold, condensed-looking uppercase display typography.

The exact font used by the existing production site should be reused if available.

If the original font cannot be identified, use a strong modern sans-serif with a condensed or editorial display feel.

Recommended fallback direction:

```text
Headings:
Space Grotesk / Geist / Inter Tight / similar

Body:
Inter / Geist Sans / system sans-serif
```

Do not automatically add multiple decorative fonts.

---

# 9. Typography Scale

Use a responsive type scale.

## Hero

Desktop:

```text
64px – 88px
Font weight: 700–800
Line height: 0.95 – 1.05
Letter spacing: -0.03em
```

Tablet:

```text
48px – 64px
```

Mobile:

```text
36px – 48px
```

Hero headings may be uppercase.

---

## H1

Desktop:

```text
48px – 64px
Weight: 700–800
Line height: 1.0 – 1.1
```

Mobile:

```text
36px – 42px
```

---

## H2

Desktop:

```text
36px – 48px
Weight: 700–800
Line height: 1.05 – 1.15
```

Mobile:

```text
28px – 36px
```

---

## H3

```text
24px – 30px
Weight: 700
Line height: 1.15
```

---

## Body

Large body:

```text
18px – 20px
Line height: 1.5 – 1.7
```

Normal body:

```text
16px
Line height: 1.5 – 1.7
```

Small:

```text
14px
Line height: 1.4 – 1.5
```

---

## Labels

Labels should generally use:

```text
12px – 14px
Weight: 600–700
Letter spacing: 0.04em – 0.08em
```

Uppercase labels are encouraged for structured metadata.

Examples:

```text
PAYMENT
CERTIFICATE
STIPEND
MODE
DURATION
LAST REVIEWED
```

---

# 10. Text Rules

Use uppercase selectively.

Good:

```text
KNOW BEFORE YOU APPLY.
EXPLORE INTERNSHIPS
PAYMENT REQUIRED
LAST REVIEWED
```

Do not make entire paragraphs uppercase.

Body copy should remain normal case for readability.

Avoid excessively long paragraphs.

---

# 11. Layout System

Use a strong editorial grid.

## Maximum Width

Recommended:

```text
1200px – 1280px
```

The exact width can follow the existing website if its source is available.

## Page Padding

Desktop:

```text
32px – 48px
```

Tablet:

```text
24px – 32px
```

Mobile:

```text
16px – 20px
```

---

# 12. Grid

Use CSS Grid for structured content.

Example:

```text
Desktop:
12-column grid

Tablet:
6-column grid

Mobile:
1-column grid
```

Cards should align cleanly.

Avoid arbitrary positioning.

---

# 13. Spacing System

Use a consistent spacing scale.

Recommended base:

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
96px
128px
```

Large sections should generally have:

```text
80px – 128px
```

vertical spacing on desktop.

Mobile sections:

```text
56px – 80px
```

Do not compress the design unnecessarily.

Whitespace is part of the visual identity.

---

# 14. Section Dividers

The existing site uses horizontal borders to separate major sections.

Use:

```css
border-top: 1px solid #2A2A2A;
```

or:

```css
border-bottom: 1px solid #2A2A2A;
```

These lines should remain subtle.

---

# 15. Accent Lines

Small blue horizontal lines can be used below section headings.

Example:

```text
WHY TRANSPARIO?
────────
```

Where the line uses Transpario Blue.

Recommended dimensions:

```text
Width: 48px – 56px
Height: 3px – 4px
```

Do not use accent lines under every heading.

Reserve them for major sections.

---

# 16. Border Radius

The visual language should remain relatively sharp.

Recommended:

```text
Buttons: 0px – 2px
Cards: 0px – 4px
Inputs: 0px – 4px
Badges: 0px – 3px
```

Avoid:

```text
rounded-full
rounded-3xl
large pill cards
```

unless the component specifically benefits from it.

---

# 17. Buttons

Buttons are a defining part of the existing Transpario design.

## Primary Button

Visual characteristics:

- White background
- Black text
- Strong typography
- Rectangular shape
- Blue offset accent
- Minimal radius

Conceptual appearance:

```text
┌─────────────────────────┐
│   EXPLORE INTERNSHIPS   │
└─────────────────────────┘
        █████████
```

The blue element should appear as an offset treatment rather than a large conventional shadow.

Recommended implementation:

```css
box-shadow: 4px 4px 0 #2563EB;
```

Use the exact offset from the existing site when possible.

## Secondary Button

Characteristics:

- Transparent/black background
- White border
- White text
- Rectangular
- Minimal radius

Example:

```text
┌─────────────────────────┐
│ REVIEW AN INTERNSHIP    │
└─────────────────────────┘
```

## Button States

### Default

High contrast.

### Hover

Use a small, intentional movement or color change.

Example:

```text
transform: translate(-1px, -1px);
```

Do not use large animations.

### Focus

Show a visible blue focus indicator.

### Disabled

Use:

- Reduced contrast
- No offset effect
- `cursor: not-allowed`

---

# 18. Links

Links should be:

- Clearly recognizable
- High contrast
- Consistent

Use blue for important interactive links.

Avoid underlining every navigation item.

For body links, underlines are acceptable and improve accessibility.

---

# 19. Navigation

## Desktop

The header should remain minimal.

Structure:

```text
[TRANSPARIO]       About  Guidelines  Contact       [BECOME A CONTRIBUTOR]
```

For the new MVP, adapt navigation to:

```text
[TRANSPARIO]       Explore  How It Works  About       [REVIEW AN INTERNSHIP]
```

The existing contributor navigation should not remain the primary product CTA if the new MVP is centered around student reviews.

## Header

Recommended:

```text
Height: 72px – 88px
Border-bottom: 1px solid #2A2A2A
```

## Mobile

Use:

- Logo
- Menu button
- Compact navigation drawer/menu

The mobile header must remain simple.

---

# 20. Logo

Use the existing Transpario logo/wordmark.

Do not redraw or replace the logo unless explicitly requested.

If a logo asset exists in the original codebase, reuse it.

The logo should have:

- Strong contrast
- Adequate clear space
- Consistent dimensions

Do not place the logo inside an unnecessary rounded container.

---

# 21. Hero Design

The hero is the strongest visual area of the website.

Recommended composition:

```text
------------------------------------------------

             KNOW BEFORE YOU APPLY.

      Understand internship opportunities
       before you decide to apply.

       [EXPLORE INTERNSHIPS]
       [REVIEW AN INTERNSHIP]

------------------------------------------------
```

Characteristics:

- Large heading
- Centered or editorial composition
- Maximum width for readability
- Minimal decoration
- Large vertical spacing
- Strong contrast

Do not fill the hero with cards, statistics, illustrations, or excessive gradients.

---

# 22. Explore Page Design

The Explore page should feel like an information registry, not an e-commerce catalog.

Recommended structure:

```text
EXPLORE INTERNSHIPS

[ Search ..................................... ]

[Filters]                 [Results]

                         Internship Card
                         Internship Card
                         Internship Card
```

Desktop:

- Search near top
- Filters on left
- Results on right

Mobile:

```text
SEARCH

[FILTERS]

RESULTS
```

Filters may use a drawer or collapsible panel on mobile.

---

# 23. Internship Cards

Cards should be information-dense but readable.

Recommended structure:

```text
COMPANY / PLATFORM

INTERNSHIP NAME
Role / Domain

PAYMENT REQUIRED
STIPEND PROVIDED
CERTIFICATE AVAILABLE

Remote · 3 Months

LAST REVIEWED
05 SEP 2026

VIEW INTERNSHIP →
```

Use borders to create structure.

Avoid excessive icons.

Icons should support comprehension, not decoration.

---

# 24. Internship Detail Page

The detail page should prioritize facts.

Recommended hierarchy:

```text
COMPANY

INTERNSHIP NAME
ROLE

Short description

--------------------------------

PAYMENT
Payment Required

CERTIFICATE
Certificate Available

STIPEND
Not Disclosed

--------------------------------

SELECTION PROCESS

Application
↓
Resume Screening
↓
Interview

--------------------------------

WORK

...

--------------------------------

MENTORSHIP

...

--------------------------------

STUDENT EXPERIENCES

...
```

Important information should be visible without forcing users through multiple tabs.

---

# 25. Classification Components

Create a reusable classification component.

Example:

```text
PAYMENT
[ PAYMENT REQUIRED ]
```

or:

```text
STIPEND
[ NOT DISCLOSED ]
```

The component should support:

- Label
- Value
- Optional supporting detail
- Optional status style

Do not rely on color alone to communicate meaning.

---

# 26. Status Badges

Badges should be rectangular and restrained.

Example:

```text
┌──────────────────┐
│ PAYMENT REQUIRED │
└──────────────────┘
```

Recommended:

```text
font-size: 12px
font-weight: 700
letter-spacing: 0.04em
padding: 6px 8px
border: 1px solid
border-radius: 2px
```

Avoid giant pills.

---

# 27. Student Experience Component

Student experiences must visually differ from structured classifications.

Example:

```text
STUDENT EXPERIENCE

"I completed the internship and worked on..."

— Anonymous Student

Submitted: 05 SEP 2026
```

Use:

- Slightly different surface
- Border
- Clear quotation/content typography
- Metadata
- Anonymous label where applicable

Never make an individual review visually look like an official Transpario statement.

---

# 28. Search Input

Search should be prominent but minimal.

Example:

```text
┌──────────────────────────────────────────────────┐
│ Search internships, companies or roles...        │
└──────────────────────────────────────────────────┘
```

Characteristics:

- Dark surface
- Thin border
- White text
- Muted placeholder
- Blue focus state
- Minimal radius

Focus:

```text
border-color: #2563EB;
```

---

# 29. Filter Controls

Filters should use:

- Checkboxes
- Selects
- Radio controls
- Compact buttons

depending on the context.

Keep labels explicit.

Example:

```text
PAYMENT

□ No Fee
□ Payment Required
□ Optional Payment
□ Unclear
```

Do not use color-only filter states.

---

# 30. Forms

Although the MVP review submission uses Google Forms, internal/admin interfaces may still contain forms.

Form principles:

- Strong labels
- Clear instructions
- High contrast
- Minimal decoration
- Visible validation
- Keyboard accessible
- Error messages next to relevant fields

Example:

```text
INTERNSHIP NAME

[...................................]

Company / Platform

[...................................]
```

---

# 31. Tables

If tables are required for future admin/public data:

- Use strong horizontal lines
- Keep columns readable
- Avoid excessive borders
- Allow horizontal scrolling on mobile
- Use uppercase column labels
- Use compact metadata

Do not turn the public site into a spreadsheet.

---

# 32. Icons

Use a single icon library consistently.

Recommended:

```text
Lucide Icons
```

Icons should generally be:

```text
16px – 20px
```

Use icons only where they improve comprehension.

Avoid:

- Decorative icon grids
- Random emoji
- Mixed icon styles
- Oversized icons

---

# 33. Images

Images should be used purposefully.

Important image types:

- Company/platform logos
- Transpario branding
- Optional editorial imagery

Company logos should:

- Preserve aspect ratio
- Have a consistent display area
- Have appropriate fallback
- Not distort

Avoid stock-photo-heavy layouts.

Transpario is an information product, not a lifestyle brand.

---

# 34. Motion

Animation should be subtle.

Allowed:

- Small hover movement
- Button offset transitions
- Fade/slide for menus
- Lightweight page transitions
- Filter interaction feedback

Avoid:

- Constant floating elements
- Large parallax effects
- Excessive scroll animations
- Long entrance animations
- Bouncy UI
- Cursor-following effects

Recommended duration:

```text
120ms – 250ms
```

Respect:

```text
prefers-reduced-motion
```

---

# 35. Hover Behavior

Hover should communicate interactivity.

Examples:

Cards:

```text
border-color changes slightly
```

Buttons:

```text
small position/offset change
```

Links:

```text
accent color transition
```

Do not dramatically transform cards.

---

# 36. Focus States

Every interactive element must have a visible focus state.

Recommended:

```text
outline: 2px solid #2563EB;
outline-offset: 2px;
```

Do not remove browser focus styles without replacing them.

---

# 37. Mobile Design

The mobile interface should preserve the same identity.

Important rules:

- Maintain strong typography
- Reduce hero size proportionally
- Preserve whitespace
- Stack content logically
- Keep buttons easy to tap
- Make filters accessible
- Prevent horizontal overflow
- Avoid tiny text
- Avoid overly dense cards

Minimum recommended touch target:

```text
44px × 44px
```

---

# 38. Accessibility

Minimum requirements:

- WCAG-conscious contrast
- Semantic HTML
- Keyboard navigation
- Visible focus
- Proper labels
- Descriptive link text
- Alt text for meaningful images
- Decorative images marked appropriately
- Screen-reader-friendly status information
- Reduced-motion support

Never communicate status using color alone.

For example:

Bad:

```text
[green badge]
```

Better:

```text
[STIPEND PROVIDED]
```

with restrained visual emphasis.

---

# 39. Responsive Breakpoints

Use Tailwind's standard breakpoints unless the existing site requires different values.

Recommended:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Do not create excessive custom breakpoints.

---

# 40. Component Architecture

The design system should produce reusable components.

Recommended component structure:

```text
components/
├── layout/
│   ├── Header
│   ├── Footer
│   ├── Container
│   └── Section
│
├── ui/
│   ├── Button
│   ├── Badge
│   ├── Input
│   ├── Select
│   ├── Checkbox
│   └── Divider
│
├── internship/
│   ├── InternshipCard
│   ├── InternshipGrid
│   ├── InternshipHeader
│   ├── Classification
│   ├── ClassificationGrid
│   ├── SelectionProcess
│   ├── StudentExperience
│   └── ReviewDate
│
└── explore/
    ├── SearchBar
    ├── FilterPanel
    ├── FilterDrawer
    └── Results
```

The exact architecture may differ, but components should remain reusable.

---

# 41. Design Tokens

Where practical, centralize tokens.

Example conceptual tokens:

```css
:root {
  --background: #000000;
  --surface: #0A0A0A;
  --surface-elevated: #111111;

  --foreground: #FFFFFF;
  --foreground-muted: #A3A3A3;
  --foreground-subtle: #737373;

  --border: #2A2A2A;
  --border-subtle: #1A1A1A;

  --accent: #2563EB;

  --radius-sm: 2px;
  --radius-md: 4px;
}
```

If the existing source code already defines tokens, reuse those instead of creating duplicate values.

---

# 42. Dark Mode

The current Transpario identity is fundamentally dark.

The MVP should use the existing dark visual system as the primary appearance.

Do not introduce a light mode unless explicitly required.

If a light mode is added in the future, it should be designed as a separate coherent theme rather than automatically inverting colors.

---

# 43. Content Density

Transpario should balance information density and whitespace.

Public pages should not feel empty.

But they should also not feel like dashboards.

Use:

- Clear sections
- Strong labels
- Short paragraphs
- Structured facts
- Cards where appropriate
- Whitespace between groups

---

# 44. Editorial Style

The interface should use typography and spacing to create hierarchy rather than relying on decorative visuals.

Good:

```text
LARGE HEADING

Short explanation.

----------------

STRUCTURED INFORMATION
```

Avoid:

```text
Huge gradient
+
Floating cards
+
3D illustration
+
Multiple glowing buttons
```

---

# 45. Empty States

Empty states should match the brand.

Example:

```text
NO INTERNSHIPS FOUND.

Try a different search or remove some filters.

[RESET FILTERS]
```

Keep it simple.

---

# 46. Error States

Example:

```text
SOMETHING WENT WRONG.

We couldn't load this information right now.

[TRY AGAIN]
```

Do not display technical error messages to normal users.

---

# 47. Not Disclosed / Unknown States

Use a consistent presentation:

```text
NOT DISCLOSED
```

or:

```text
UNCLEAR
```

Do not use blank fields.

Do not use:

```text
N/A
-
?
Unknown???
```

unless specifically required by the content model.

---

# 48. Last Reviewed

This is an important trust element.

Display:

```text
LAST REVIEWED
05 SEP 2026
```

or inline:

```text
Last Reviewed: 05 Sep 2026
```

It should be visible on internship pages.

Do not make it visually dominant.

---

# 49. Footer

The footer should continue the existing visual language.

Recommended:

```text
------------------------------------------------

TRANSPARIO

KNOW BEFORE YOU APPLY.

About
Explore
How It Works
Review an Internship
Methodology
Contact

------------------------------------------------

© TRANSPARIO
```

Use strong section separation.

---

# 50. Do Not Use

The following visual patterns are explicitly discouraged:

- Glassmorphism
- Excessive blur
- Giant rounded containers
- Excessive pill UI
- Heavy gradients
- Neon cyberpunk styling
- Excessive glowing effects
- Generic dashboard layouts
- Excessive illustrations
- Stock photography as decoration
- Excessive shadows
- Excessive animations
- Emoji-based UI
- Random color palettes
- Multiple unrelated fonts
- Overly dense data tables on public pages

---

# 51. Existing Brand Preservation Rule

This is a hard requirement.

Before implementing the new UI:

1. Inspect the existing Transpario website.
2. If source code is available, inspect the source.
3. Identify the actual fonts.
4. Identify the actual colors.
5. Identify spacing patterns.
6. Identify border styles.
7. Identify button behavior.
8. Identify navigation patterns.
9. Identify logo implementation.
10. Reuse the existing design language.

If the existing production implementation conflicts with a recommendation in this document, prefer the existing brand where doing so maintains consistency.

Do not redesign the brand without explicit instruction.

---

# 52. UI Quality Checklist

Before considering a page complete, verify:

### Visual

- [ ] Black/dark foundation is consistent.
- [ ] Typography matches Transpario.
- [ ] Blue accent is used intentionally.
- [ ] Borders are consistent.
- [ ] Buttons match the existing style.
- [ ] Spacing is consistent.
- [ ] No unnecessary gradients.
- [ ] No excessive rounded corners.

### UX

- [ ] Primary action is obvious.
- [ ] Important information is scannable.
- [ ] Missing information has a clear state.
- [ ] Search/filter behavior is understandable.
- [ ] Navigation is consistent.
- [ ] Mobile layout works.

### Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Contrast is sufficient.
- [ ] Semantic headings are used.
- [ ] Buttons/links are accessible.
- [ ] Status does not rely on color alone.

### Responsive

- [ ] Desktop works.
- [ ] Tablet works.
- [ ] Mobile works.
- [ ] No horizontal overflow.
- [ ] Touch targets are large enough.

---

# 53. Antigravity Implementation Instruction

Antigravity must treat this file as the visual specification for Transpario.

Before building components:

1. Read `PRD.md`.
2. Read this `DESIGN_SYSTEM.md`.
3. Inspect the existing Transpario website at `transpario.page`.
4. Inspect the existing source code if provided.
5. Reuse existing branding wherever possible.
6. Build the new pages as a coherent extension of the existing website.

Do not create a new visual identity.

Do not replace the existing black/white/blue editorial style with a generic modern SaaS theme.

The result should look like:

> **The existing Transpario website evolved into a full internship transparency platform.**

not:

> **A completely new website that happens to use the Transpario name.**

---

# 54. Final Design Direction

The final visual experience should communicate:

```text
TRANSPARENCY
        +
INFORMATION
        +
CONFIDENCE
```

The user should immediately feel that Transpario is:

- Serious
- Clear
- Independent
- Structured
- Trustworthy

The interface should never make the user wonder where important information is.

The design exists to support the product's central promise:

# KNOW BEFORE YOU APPLY.
