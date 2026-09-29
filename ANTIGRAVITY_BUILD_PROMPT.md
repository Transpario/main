# Transpario — Antigravity Build Prompt

**Version:** 1.0  
**Project:** Transpario  
**Domain:** transpario.page  
**Build Target:** Production-ready MVP

---

# 1. ROLE

You are the primary engineering agent responsible for building the complete Transpario MVP.

You are expected to:

- Understand the product before coding
- Inspect the existing Transpario website
- Inspect the existing codebase if provided
- Build the frontend
- Integrate Sanity
- Implement search and filtering
- Implement the review submission flow
- Implement responsive behavior
- Implement SEO
- Implement accessibility
- Test the application
- Fix errors
- Prepare the application for production deployment

Do not stop at a visual prototype.

Build a functional, maintainable MVP.

---

# 2. SOURCE DOCUMENTS

Before writing code, read ALL of these files completely:

```text
PRD.md
DESIGN_SYSTEM.md
SITE_CONTENT.md
GOOGLE_FORM_SPEC.md
SANITY_SCHEMA.md
```

These files are the source of truth.

Use them together:

```text
PRD.md
    ↓
Product requirements

DESIGN_SYSTEM.md
    ↓
Visual system

SITE_CONTENT.md
    ↓
Public copy/content

GOOGLE_FORM_SPEC.md
    ↓
Review submission workflow

SANITY_SCHEMA.md
    ↓
CMS/data structure
```

Do not ignore any of these documents.

If there is a conflict:

1. Preserve the existing Transpario brand.
2. Follow the PRD for product behavior.
3. Follow the Design System for UI.
4. Follow the Sanity Schema for CMS structure.
5. Follow Site Content for approved copy.
6. Choose the simplest implementation that satisfies the requirements.

---

# 3. MOST IMPORTANT RULE

## INSPECT BEFORE YOU BUILD

The existing Transpario website is the visual source of truth.

Website:

```text
https://transpario.page
```

Before implementing the new UI:

1. Inspect the existing website.
2. Understand its layout.
3. Identify its typography.
4. Identify its colors.
5. Identify its spacing.
6. Identify its borders.
7. Identify its buttons.
8. Identify its navigation.
9. Identify its logo.
10. Identify existing animations.
11. Identify reusable components if source code is available.
12. Identify any existing responsive behavior.

If the existing source repository is provided, inspect it before replacing anything.

Do NOT create a completely new visual identity.

The finished application should look like:

> The existing Transpario website evolved into a full internship transparency platform.

Not:

> A generic SaaS website using the Transpario name.

---

# 4. PRODUCT

Transpario is an internship transparency platform.

Primary audience:

> Students researching internships.

Primary purpose:

> Help students understand internship opportunities before applying.

Primary motto:

# KNOW BEFORE YOU APPLY.

Core philosophy:

> We don't tell students what to choose. We help them understand what they're choosing.

---

# 5. PRODUCT POSITIONING

Transpario is neutral.

Do not build the product as:

- A blacklist
- A scam database
- A company attack platform
- A complaint forum
- A company rating website

Avoid unsupported labels such as:

- Fake
- Scam
- Fraud
- Bad company

Instead use structured factual classifications:

```text
No Fee
Payment Required
Optional Payment
Unclear
```

and:

```text
Stipend Provided
No Stipend
Performance Based
Not Disclosed
```

Student experiences must remain clearly identified as individual experiences.

---

# 6. MVP SCOPE

Build only the defined MVP.

Required public pages:

```text
/
 /explore
 /internships/[slug]
 /review
 /how-it-works
 /about
 /guidelines
 /faq
 /contact
```

Content for all of these exists in `SITE_CONTENT.md` (§42–52), so none of them are optional for this MVP — build all nine routes.

Do not create unnecessary pages.

---

# 7. PRIMARY NAVIGATION

Desktop:

```text
TRANSPARIO

Explore
How It Works
About

Review an Internship
```

The exact arrangement should follow the existing website's visual style.

Mobile:

Use a clean responsive menu.

Do not make the navigation complicated.

---

# 8. HOMEPAGE

Build a strong editorial homepage.

## Hero

Headline:

```text
KNOW BEFORE YOU APPLY.
```

Supporting copy:

```text
Understand internship opportunities through structured information and real student experiences.
```

Primary CTA:

```text
EXPLORE INTERNSHIPS
```

Secondary CTA:

```text
REVIEW AN INTERNSHIP
```

---

# 9. HOMEPAGE SECTIONS

Implement:

```text
Hero
↓
Why Transpario
↓
Recently Reviewed
↓
How It Works
↓
Review CTA
↓
Trust / Methodology
↓
Footer
```

Do not turn the homepage into a dashboard.

Keep it editorial and spacious.

---

# 10. EXPLORE PAGE

Route:

```text
/explore
```

Required functionality:

- Search
- Filtering
- Sorting
- Published internship listing
- Empty state
- Responsive layout

Search by:

```text
Company / Platform
Internship Name
Role
Domain
```

Filters:

```text
Domain
Mode
Payment
Certificate
Stipend
Duration
Selection
```

Sort:

```text
Recently Reviewed
Recently Added
Alphabetical
```

---

# 11. EXPLORE UX

Desktop:

```text
-----------------------------------------------
EXPLORE INTERNSHIPS

[ SEARCH ]

[FILTERS]              [RESULTS]
                       [CARD]
                       [CARD]
                       [CARD]
-----------------------------------------------
```

Mobile:

```text
EXPLORE INTERNSHIPS

[ SEARCH ]

[FILTERS]

RESULTS
[CARD]
[CARD]
```

Filters may become a drawer/collapsible interface on mobile.

Do not create a complicated filter engine.

---

# 12. INTERNSHIP CARD

Create a reusable `InternshipCard`.

It should show:

```text
Company / Platform
Internship Name
Role / Domain

Payment
Certificate
Stipend

Mode
Duration

Last Reviewed

VIEW INTERNSHIP →
```

Keep the card scannable.

Do not show every field available in Sanity.

---

# 13. INTERNSHIP DETAIL PAGE

Route:

```text
/internships/[slug]
```

This is one of the most important pages.

It should clearly show:

```text
Company / Platform
Internship Name
Role
Domain
Mode
Duration
Last Reviewed
```

Then:

```text
Overview
Payment
Certificate
Stipend
Selection Process
Work & Experience
Mentorship
Student Experiences
```

Information should be immediately scannable.

Do not hide important information behind tabs unless absolutely necessary.

---

# 14. CLASSIFICATION DISPLAY

Create reusable components.

Example:

```text
PAYMENT

PAYMENT REQUIRED

₹1,500
Mandatory
```

or:

```text
STIPEND

NOT DISCLOSED
```

Use structured values from Sanity.

Never invent values.

---

# 15. PAYMENT RULES

Allowed values:

```text
No Fee
Payment Required
Optional Payment
Unclear
```

Important:

Do not classify payment based only on the existence of a paid optional course/service.

If information is insufficient:

```text
UNCLEAR
```

---

# 16. CERTIFICATE RULES

Allowed values:

```text
Free Certificate
Certificate Available
Certificate Requires Payment
No Certificate
Not Disclosed
```

Do not infer missing information.

---

# 17. STIPEND RULES

Allowed values:

```text
Stipend Provided
No Stipend
Performance Based
Not Disclosed
```

Critical rule:

If no stipend information is available, show:

```text
NOT DISCLOSED
```

Do not show:

```text
NO STIPEND
```

unless the information supports it.

---

# 18. SELECTION PROCESS

Render selection steps when available.

Example:

```text
APPLICATION
     ↓
RESUME SCREENING
     ↓
TECHNICAL TEST
     ↓
INTERVIEW
```

Do not invent missing steps.

---

# 19. WORK INFORMATION

Display:

```text
Work Type
Project Information
Responsibilities
Technologies
Deliverables
```

only when available.

Possible work types:

```text
Project Based
Real Company Project
Internal Project
Assignment Based
Training Based
Research Based
Not Disclosed
```

---

# 20. MENTORSHIP

Display:

```text
Dedicated Mentor
Group Mentorship
Periodic Mentorship
No Mentorship
Not Disclosed
```

Optional supporting details can be displayed.

---

# 21. STUDENT EXPERIENCES

Student reviews must be visually distinct from official structured data.

Use a component such as:

```text
STUDENT EXPERIENCE

"Review text..."

— Anonymous Student

SUBMITTED: 05 SEP 2026
```

Add contextual text:

```text
Student experiences represent individual experiences and may not reflect the experience of every participant.
```

Do not present a student's opinion as an official Transpario statement.

---

# 22. NO NUMERICAL RATINGS

Do not implement:

- Stars
- 1–5 ratings
- Overall score
- Trust score
- Risk score
- Company leaderboard
- Internship ranking

The MVP is an information platform.

---

# 23. REVIEW AN INTERNSHIP

The website must NOT build a custom review backend.

The CTA:

```text
REVIEW AN INTERNSHIP
```

should open the Google Form configured in Sanity:

```text
siteSettings.googleFormUrl
```

Do not hard-code the Google Form URL in multiple components.

Create one reusable configuration source.

---

# 24. REVIEW PAGE

Route:

```text
/review
```

This page can briefly explain:

```text
HAD AN INTERNSHIP EXPERIENCE?

Your experience could help another student understand what to expect.

Submissions are reviewed before any information is published.
```

Then:

```text
OPEN REVIEW FORM →
```

The button should use the URL from Sanity Site Settings.

---

# 25. SANITY

Integrate Sanity according to:

```text
SANITY_SCHEMA.md
```

Required document types:

```text
internshipPlatform
internshipProgram
studentReview
faq
page
siteSettings
```

Do not invent a different schema unless technically necessary.

---

# 26. SANITY PUBLICATION RULE

Only display content publicly when:

```text
publicationStatus == "published"
```

and:

```text
founderApproved == true
```

Student reviews must satisfy the same publication principle.

Drafts and internal documents must never appear on the public website.

---

# 27. SANITY SECURITY

Never expose:

- Sanity write token
- Private API credentials
- Internal evidence
- Private review fields

to browser/client-side code.

Use environment variables.

If a private read token is required, keep it server-side.

---

# 28. PUBLIC DATA SAFETY

When fetching internship data, avoid returning internal fields unnecessarily.

Public queries should explicitly select public fields where practical.

Never accidentally render:

```text
sourceNotes
internalEvidenceReference
reviewedBy
private contact information
internal moderation notes
```

---

# 29. SANITY STUDIO

Use Sanity Studio as the MVP admin interface.

Do not build a separate custom admin dashboard.

Editors should be able to:

- Add platforms
- Add internships
- Edit classifications
- Add reviews
- Approve content
- Publish/unpublish
- Update pages
- Update FAQs
- Update site settings

---

# 30. FOUNDER APPROVAL

Public content originating from student submissions requires founder approval.

Conceptual workflow:

```text
Submission
↓
Review
↓
Clarification if needed
↓
Sanity Draft
↓
Founder Approval
↓
Published
```

Do not allow a normal public user to publish anything.

---

# 31. CONTENT

Use:

```text
SITE_CONTENT.md
```

as the source for public copy.

Do not invent marketing copy unnecessarily.

Maintain the approved language.

Important phrase:

> KNOW BEFORE YOU APPLY.

Important philosophy:

> We don't tell students what to choose. We help them understand what they're choosing.

---

# 32. DESIGN

Use:

```text
DESIGN_SYSTEM.md
```

as the visual specification.

The current Transpario website is the primary reference.

The visual direction is:

```text
Dark
Editorial
Minimal
High contrast
Typography focused
Slightly brutalist
Structured
Professional
```

Primary visual characteristics:

```text
Black background
White typography
Blue accent
Thin borders
Rectangular UI
Strong headings
Generous whitespace
Minimal radius
```

---

# 33. DO NOT USE

Avoid:

```text
Glassmorphism
Excessive gradients
Huge rounded cards
Pill-heavy UI
Neon cyberpunk effects
Generic SaaS dashboard styling
Excessive shadows
Excessive animation
Stock-photo-heavy layouts
Emoji UI
Multiple unrelated fonts
```

---

# 34. BUTTONS

Follow the existing Transpario button style.

Primary:

```text
White background
Black text
Blue offset/shadow
Rectangular shape
```

Secondary:

```text
Transparent background
White border
White text
Rectangular
```

Use subtle hover movement.

Do not overanimate buttons.

---

# 35. COLORS

Preserve the existing site's color identity.

Primary direction:

```text
Black / near-black
White
Muted gray
Transpario blue
```

Use the actual values from the existing implementation when available.

The Design System provides fallback tokens, but the existing production site's values take priority when identifiable.

---

# 36. TYPOGRAPHY

Inspect the existing site first.

Reuse the existing font if possible.

Typography should have:

```text
Strong display headings
High contrast
Clear hierarchy
Readable body text
Uppercase labels where appropriate
```

Do not use decorative typography everywhere.

---

# 37. RESPONSIVENESS

Build mobile-first.

Required:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Test at least:

```text
320px
375px
768px
1024px
1280px
1440px
```

No horizontal overflow.

---

# 38. ACCESSIBILITY

Implement:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Visible focus states
- Accessible form controls
- Accessible buttons
- Descriptive links
- Alt text
- Sufficient contrast
- Reduced motion support

Never communicate status using color alone.

---

# 39. PERFORMANCE

Prioritize:

- Server rendering where appropriate
- Static generation where useful
- Optimized images
- Sanity image transformations
- Minimal client JavaScript
- Lazy loading where appropriate
- Efficient GROQ queries
- No unnecessary dependencies

Do not add libraries just because they are popular.

---

# 40. SEO

Implement:

- Page titles
- Meta descriptions
- Canonical URLs
- Open Graph metadata
- Sitemap
- Robots
- Clean slugs
- Appropriate structured data

Internship detail pages should have unique metadata.

Example:

```text
[INTERNSHIP NAME] — [COMPANY] | Transpario
```

---

# 41. ROUTING

Recommended:

```text
/
 /explore
 /internships/[slug]
 /review
 /how-it-works
 /about
 /guidelines
 /faq
 /contact
```

`SITE_CONTENT.md` §52 defines full Contact page content (heading, intro, contact categories, and an email sourced from `siteSettings.contactEmail`). Build it as a real page at `/contact` rather than a bare `mailto:` footer link.

Only create optional routes if they are actually needed.

Use clean URLs.

---

# 42. ERROR HANDLING

Create friendly states.

## Not Found

```text
INTERNSHIP NOT FOUND.

The internship you're looking for may have been removed or the link may be incorrect.

[EXPLORE INTERNSHIPS]
```

## Data Error

```text
INFORMATION COULDN'T BE LOADED.

Something went wrong while loading this information.

[TRY AGAIN]
```

Never expose stack traces.

---

# 43. EMPTY STATES

Explore:

```text
NO INTERNSHIPS FOUND.

Try a different search or remove some filters.

[RESET FILTERS]
```

Keep empty states visually consistent with Transpario.

---

# 44. MISSING INFORMATION

Never leave important fields visually blank.

Use:

```text
NOT DISCLOSED
```

or:

```text
UNCLEAR
```

depending on the data.

Do not use:

```text
N/A
-
?
Unknown???
```

unless specifically required.

---

# 45. COMPONENT ARCHITECTURE

Create reusable components.

Recommended:

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

The exact structure may differ.

Do not duplicate identical UI.

---

# 46. TECH STACK

Use:

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Sanity
GitHub
Cloudflare
Google Forms
Google Sheets
```

Do not introduce a separate database unless required.

Do not add Supabase simply because it is available.

Sanity is sufficient for the MVP's public content.

---

# 47. NEXT.JS ARCHITECTURE

Use the current stable Next.js App Router approach.

Prefer:

- Server Components
- Server-side Sanity queries
- Static generation/revalidation where appropriate
- Client Components only when interactivity requires them

Do not make the entire application a Client Component.

---

# 48. TAILWIND

Use Tailwind for styling.

Centralize important design tokens.

Do not scatter arbitrary colors throughout components.

Prefer semantic classes/tokens where practical.

---

# 49. SHADCN/UI

Use shadcn/ui selectively.

Customize components to match Transpario.

Do NOT use default shadcn styling without modification if it conflicts with the existing brand.

Especially customize:

- Buttons
- Inputs
- Selects
- Dialogs
- Drawer
- Checkbox
- Dropdowns

The final UI should look like Transpario, not like default shadcn.

---

# 50. DATA FETCHING

Create a clear Sanity data layer.

Recommended conceptual structure:

```text
lib/
└── sanity/
    ├── client
    ├── queries
    ├── image
    └── types
```

Keep GROQ queries separate from UI components.

---

# 51. TYPES

Create TypeScript types for:

```text
InternshipPlatform
InternshipProgram
StudentReview
FAQ
Page
SiteSettings
```

Avoid using:

```text
any
```

unless there is a legitimate unavoidable reason.

---

# 52. SEARCH IMPLEMENTATION

For MVP:

Use Sanity data with application-level filtering/search.

Do not introduce Algolia, Elasticsearch, Meilisearch, or another search service unless the dataset/requirements actually justify it.

Search should remain simple and fast.

---

# 53. FILTER IMPLEMENTATION

Filters should operate against published internship data.

Recommended filter fields:

```text
domain
mode
paymentStatus
certificateStatus
stipendStatus
durationCategory
selectionProcess
```

Filter by `durationCategory` (structured enum: under 1 month / 1–3 months / 3–6 months / 6+ months / not disclosed), not by `duration`. `duration` is a free-text field for display only (e.g. "8 Weeks") and cannot be grouped into filter buckets reliably. See `SANITY_SCHEMA.md` §8.

Multiple filters should work together.

Example:

```text
Cybersecurity
+
Remote
+
No Fee
+
Stipend Provided
```

---

# 54. SORTING

Implement:

```text
Recently Reviewed
Recently Added
Alphabetical
```

Recently Reviewed should use:

```text
lastReviewed
```

Recently Added should use:

```text
_createdAt
```

Alphabetical should use:

```text
name
```

---

# 55. REVIEW DATE

Display:

```text
LAST REVIEWED
[DATE]
```

This should be visible on internship detail pages.

It may also appear on cards.

---

# 56. CONTENT EDITABILITY

Sanity should control:

- Internship data
- Reviews
- FAQs
- About
- How It Works
- Guidelines
- Contact
- Google Form URL
- Site settings

Do not build a complex page builder.

---

# 57. GOOGLE FORM INTEGRATION

Read:

```text
siteSettings.googleFormUrl
```

Use this URL for:

```text
Review an Internship
```

The URL should be configurable without changing application code.

---

# 58. FOOTER

Use the existing site's footer visual language.

Include:

```text
TRANSPARIO
KNOW BEFORE YOU APPLY.

Explore
Review an Internship
How It Works
About
Guidelines
FAQ
Contact
```

Use the configured site settings where appropriate.

---

# 59. ANALYTICS

If analytics are added:

Use:

```text
Cloudflare Web Analytics
```

Do not add unnecessary tracking systems.

Respect user privacy.

---

# 60. ENVIRONMENT VARIABLES

Use environment variables for configuration.

Expected Sanity variables may include:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_READ_TOKEN
```

Only expose variables that are safe to expose.

Do not commit secrets.

Create/update:

```text
.env.example
```

with variable names but no real secrets.

---

# 61. GIT

Use Git properly.

Recommended:

```text
main
```

for production.

Commit logical milestones.

Examples:

```text
chore: initialize Transpario app
feat: implement design system
feat: add Sanity integration
feat: add internship explorer
feat: add internship detail pages
feat: add review flow
feat: add SEO
fix: responsive mobile layout
```

Do not commit:

```text
.env
.env.local
private credentials
Sanity tokens
```

---

# 62. PROJECT STRUCTURE

A reasonable final structure:

```text
transpario/
│
├── app/
│   ├── page.tsx
│   ├── explore/
│   ├── internships/
│   ├── review/
│   ├── how-it-works/
│   ├── about/
│   ├── guidelines/
│   ├── faq/
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── internship/
│   └── explore/
│
├── lib/
│   └── sanity/
│
├── sanity/
│   ├── schemas/
│   ├── lib/
│   └── structure/
│
├── public/
│
├── docs/
│
├── .env.example
├── next.config.*
├── tailwind.config.*
├── tsconfig.json
├── package.json
└── README.md
```

Adjust this to the existing repository if one already exists.

---

# 63. EXISTING CODEBASE RULE

If an existing Transpario repository is provided:

DO NOT immediately delete or replace it.

First:

1. Inspect it.
2. Run it.
3. Understand the architecture.
4. Identify reusable components.
5. Identify existing dependencies.
6. Identify existing styles.
7. Identify existing routes.
8. Identify existing assets.
9. Determine what can be extended.
10. Only replace code when necessary.

Preserve working functionality unless the PRD explicitly changes it.

---

# 64. ASSETS

Reuse existing assets where possible:

- Logo
- Favicon
- Fonts
- Icons
- Images
- Existing brand assets

Do not download random replacement assets unless necessary.

If an asset is missing, use a simple appropriate fallback.

---

# 65. NO FABRICATED DATA

Do not populate production with fabricated:

- Companies
- Internship programs
- Student reviews
- Payment amounts
- Stipends
- Certificates
- Testimonials

For development only, use clearly marked test records.

Example:

```text
TEST — Example Internship
TEST — Example Platform
```

Ensure test records cannot accidentally appear in production.

---

# 66. CONTENT SAFETY

Do not create unsupported claims about companies.

Do not create fake testimonials.

Do not turn hypothetical examples into real claims.

Do not generate accusations.

If seed/demo content is required, make it obviously fictional.

---

# 67. QUALITY REQUIREMENTS

Before declaring the project complete:

Run:

```text
npm install
npm run lint
npm run build
```

and the appropriate development command.

Fix all blocking issues.

There should be:

- No TypeScript errors
- No build errors
- No broken routes
- No obvious console errors
- No missing critical assets
- No exposed secrets

---

# 68. TESTING

Test:

## Homepage

- Navigation
- CTAs
- Responsive layout

## Explore

- Search
- Every filter
- Combined filters
- Sorting
- Empty state
- Mobile filter behavior

## Internship Detail

- Valid slug
- Invalid slug
- All classifications
- Student reviews
- Last reviewed date

## Review

- Google Form CTA
- Missing Google Form configuration handling

## Navigation

- Desktop
- Mobile
- Footer links

---

# 69. RESPONSIVE QA

Check at:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
```

Specifically check:

- Hero text
- Header
- Buttons
- Cards
- Filters
- Internship detail sections
- Footer
- Horizontal overflow

---

# 70. ACCESSIBILITY QA

Check:

- Tab navigation
- Focus indicators
- Keyboard controls
- Screen-reader labels
- Heading hierarchy
- Form labels
- Link names
- Color contrast

---

# 71. SEO QA

Verify:

- Home metadata
- Explore metadata
- Internship metadata
- About metadata
- How It Works metadata
- Guidelines metadata
- Sitemap
- Robots
- Canonical URLs
- Open Graph

---

# 72. PERFORMANCE QA

Verify:

- Optimized images
- No unnecessary client components
- No huge JavaScript bundles
- No unnecessary external scripts
- Efficient Sanity queries
- Appropriate caching/revalidation

---

# 73. SECURITY QA

Verify:

- No secrets in Git
- No private Sanity token in browser
- No internal evidence rendered publicly
- No private student information rendered publicly
- No admin functionality exposed publicly

---

# 74. DEPLOYMENT

The target deployment should work with Cloudflare.

Prepare the project for production deployment.

The final documentation should explain:

```text
Environment variables
Sanity configuration
Build command
Deployment configuration
Custom domain configuration
```

Do not assume production credentials.

Use placeholders where credentials are required.

---

# 75. CLOUDFLARE

The final project should be deployable on the user's existing Cloudflare setup.

Do not change DNS records automatically unless explicitly authorized.

Document the required deployment steps.

---

# 76. DOMAIN

Production domain:

```text
transpario.page
```

Ensure URLs, canonical metadata, Open Graph URLs, and sitemap configuration use the correct production domain.

Do not use localhost URLs in production metadata.

---

# 77. ERROR BOUNDARIES

Use appropriate Next.js error/not-found handling.

At minimum:

```text
not-found
error
loading
```

where appropriate for major routes.

Keep error pages aligned with Transpario's design.

---

# 78. LOADING UI

Loading states should be minimal.

Example:

```text
LOADING INTERNSHIPS...
```

Use skeletons only where they genuinely improve perceived performance.

Do not create elaborate animated loaders.

---

# 79. ANIMATION

Use animation sparingly.

Allowed:

- Button hover
- Card hover
- Menu transitions
- Small page transitions
- Filter transitions

Avoid:

- Constant motion
- Parallax
- Excessive scroll animation
- Bouncy elements
- Glowing effects

Support:

```text
prefers-reduced-motion
```

---

# 80. DESIGN CONSISTENCY

Every new component must feel like it belongs to the same system.

Check:

```text
Typography
Spacing
Borders
Buttons
Colors
Radius
Interaction
```

Do not introduce a component with a completely different visual language.

---

# 81. IMPORTANT TERMINOLOGY

Use:

```text
No Fee
Payment Required
Optional Payment
Unclear
```

Do NOT use:

```text
Paid Internship
```

because this phrase can be misunderstood as an internship that pays the student.

For student payments, use:

```text
Payment
```

For money paid to students, use:

```text
Stipend
```

---

# 82. IMPORTANT DISTINCTION

Payment:

> Money the student pays.

Stipend:

> Money the student receives.

Keep these visually and semantically separate throughout the application.

---

# 83. PUBLIC LANGUAGE

Prefer:

> Payment Required

instead of:

> Paid Internship

Prefer:

> Student Experience

instead of:

> Review Score

Prefer:

> Not Disclosed

instead of:

> No

when information is unavailable.

Prefer:

> Unclear

when available information is insufficient to determine the classification.

---

# 84. FOUNDER CONTROL

The founder retains final control over public classifications and publication.

The implementation must support this operationally through Sanity's editorial workflow.

Do not build an automatic system that publishes student submissions.

---

# 85. FUTURE FEATURES

Do not implement unless explicitly requested:

```text
User accounts
Student dashboards
Contributor dashboard
Company accounts
Company dashboard
Comments
Likes
Follows
Messaging
Subscriptions
Advertising
Payment gateway
Numerical ratings
Ranking
AI investigation
Automated accusations
Custom moderation platform
Advanced search engine
```

The MVP should remain focused.

---

# 86. BUILD ORDER

Implement in this order:

## Phase 1

Project inspection and setup.

## Phase 2

Existing brand/design extraction.

## Phase 3

Design system implementation.

## Phase 4

Sanity setup and schemas.

## Phase 5

Core layout:

```text
Header
Footer
Container
Section
Buttons
Typography
```

## Phase 6

Homepage.

## Phase 7

Explore page.

## Phase 8

Internship detail page.

## Phase 9

Student review rendering.

## Phase 10

Review page / Google Form integration.

## Phase 11

About / How It Works / Guidelines / FAQ.

## Phase 12

SEO.

## Phase 13

Accessibility.

## Phase 14

Responsive QA.

## Phase 15

Production build and deployment preparation.

---

# 87. DO NOT STOP AFTER EACH PHASE

Work through the complete implementation.

If you encounter an issue:

1. Diagnose it.
2. Fix it.
3. Continue.
4. Re-test affected functionality.

Do not repeatedly ask for permission for normal implementation decisions.

Use the source documents as authority.

Ask for clarification only when a decision genuinely cannot be resolved from the provided requirements or existing code.

---

# 88. DECISION-MAKING RULE

When multiple technical approaches are possible, choose the one that is:

1. Simplest
2. Reliable
3. Maintainable
4. Fast
5. $0-friendly
6. Compatible with the defined stack
7. Consistent with the existing project

Do not overengineer.

---

# 89. FINAL QA CHECKLIST

Before completion:

## Product

- [ ] Product purpose is clear.
- [ ] Neutral positioning is maintained.
- [ ] No numerical ratings.
- [ ] No unsupported accusations.
- [ ] Review flow works.

## Pages

- [ ] Homepage
- [ ] Explore
- [ ] Internship detail
- [ ] Review
- [ ] How It Works
- [ ] About
- [ ] Guidelines
- [ ] FAQ
- [ ] Contact

## CMS

- [ ] Sanity connected
- [ ] Schemas implemented
- [ ] References work
- [ ] Publication status works
- [ ] Founder approval works
- [ ] Private fields stay private

## Search

- [ ] Search works
- [ ] Filters work
- [ ] Combined filters work
- [ ] Sorting works
- [ ] Empty state works

## UI

- [ ] Existing Transpario identity preserved
- [ ] Typography consistent
- [ ] Colors consistent
- [ ] Buttons consistent
- [ ] Borders consistent
- [ ] Mobile responsive
- [ ] No horizontal overflow

## Accessibility

- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Semantic HTML
- [ ] Accessible controls
- [ ] Contrast
- [ ] Reduced motion

## SEO

- [ ] Metadata
- [ ] Sitemap
- [ ] Robots
- [ ] Canonical URLs
- [ ] Open Graph

## Technical

- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Build passes
- [ ] No exposed secrets
- [ ] No blocking console errors
- [ ] README updated
- [ ] `.env.example` exists

---

# 90. FINAL OUTPUT EXPECTATION

At the end of the build, provide a concise implementation report containing:

```text
1. What was built
2. Routes created
3. Sanity schemas implemented
4. Main components created
5. Search/filter functionality
6. Google Form integration
7. SEO implementation
8. Accessibility work
9. Tests/build status
10. Environment variables required
11. Deployment instructions
12. Any remaining limitations
```

Do not claim something is complete if it has not been tested.

---

# 91. FINAL PRODUCT STANDARD

The final Transpario application should feel like a serious independent platform.

A student should be able to open the website and quickly understand:

```text
What is this?
        ↓
What information is available?
        ↓
What does this internship require?
        ↓
What did other students experience?
        ↓
When was this information reviewed?
        ↓
Can I make a more informed decision?
```

The design should remain simple.

The information should remain clear.

The classifications should remain neutral.

The CMS should remain manageable.

The application should remain fast.

---

# 92. FINAL INSTRUCTION

Build Transpario according to all provided project documents.

Do not treat this as a mockup.

Do not create a generic SaaS template.

Do not redesign the brand.

Do not overengineer.

Do not fabricate information.

Do not automatically publish submissions.

Inspect first.

Build carefully.

Test everything.

The final result should be a production-ready MVP that extends the existing Transpario website into a complete internship transparency platform.

The product promise is:

# KNOW BEFORE YOU APPLY.

And the product philosophy is:

> **We don't tell students what to choose. We help them understand what they're choosing.**
