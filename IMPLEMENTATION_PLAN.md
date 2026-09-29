# Transpario — Implementation Plan

**Version:** 1.0  
**Product:** Transpario  
**Domain:** transpario.page  
**Target:** Production-ready MVP  
**Primary Motto:** KNOW BEFORE YOU APPLY.

---

# 1. Purpose

This document defines the recommended implementation sequence for building the Transpario MVP.

The goal is to give Antigravity a clear execution order so that the project is built systematically rather than as one large unstructured implementation.

The implementation should prioritize:

1. Existing brand preservation
2. Core functionality
3. Sanity integration
4. Search and filtering
5. Review submission flow
6. Responsive design
7. Accessibility
8. SEO
9. Performance
10. Production readiness

---

# 2. Source Documents

Before implementation begins, read:

```text
PRD.md
DESIGN_SYSTEM.md
SITE_CONTENT.md
GOOGLE_FORM_SPEC.md
SANITY_SCHEMA.md
ANTIGRAVITY_BUILD_PROMPT.md
```

These documents collectively define the product.

Use them as the primary source of truth.

---

# 3. Implementation Strategy

Build the project in the following order:

```text
PHASE 0
Project + Existing Site Audit
        ↓
PHASE 1
Project Foundation
        ↓
PHASE 2
Design System
        ↓
PHASE 3
Sanity CMS
        ↓
PHASE 4
Core Layout
        ↓
PHASE 5
Homepage
        ↓
PHASE 6
Explore
        ↓
PHASE 7
Internship Detail
        ↓
PHASE 8
Review Flow
        ↓
PHASE 9
Informational Pages
        ↓
PHASE 10
SEO + Accessibility
        ↓
PHASE 11
Testing + QA
        ↓
PHASE 12
Production Preparation
```

Do not skip the existing-site audit.

---

# 4. Phase 0 — Existing Site Audit

## Goal

Understand the current Transpario website before changing anything.

Existing website:

```text
https://transpario.page
```

If an existing repository is provided, inspect it first.

---

## Tasks

Inspect:

- Existing routes
- Existing components
- Existing CSS
- Tailwind configuration
- Fonts
- Colors
- Logo
- Favicon
- Header
- Footer
- Buttons
- Cards
- Animations
- Responsive behavior
- Existing dependencies
- Existing deployment configuration

---

## Deliverable

Create an internal implementation note containing:

```text
Existing architecture
Existing design system
Reusable components
Reusable assets
Routes that should be preserved
Code that can be extended
Code that needs replacement
Potential conflicts
```

Do not delete existing code before understanding it.

---

# 5. Phase 1 — Project Foundation

## Goal

Prepare a clean development environment.

---

## Tasks

If an existing Next.js project exists:

- Reuse it where practical.
- Update dependencies only when necessary.
- Preserve working configuration.

If a new project is required:

- Initialize Next.js
- TypeScript
- Tailwind CSS
- ESLint
- App Router

---

## Install

Required technology:

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Sanity
```

Only install additional dependencies when justified.

---

## Configuration

Set up:

```text
.env.example
.gitignore
TypeScript
ESLint
Tailwind
Next.js
Sanity
```

Expected environment variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_READ_TOKEN
```

Do not commit real credentials.

---

## Deliverable

Application should:

```text
npm install
npm run dev
npm run lint
npm run build
```

without blocking errors.

---

# 6. Phase 2 — Design System

## Goal

Turn the existing Transpario visual language into reusable UI primitives.

---

## Tasks

Implement:

```text
Colors
Typography
Spacing
Borders
Buttons
Inputs
Badges
Cards
Dividers
Container
Section
```

---

## Brand

Primary direction:

```text
Black
White
Muted Gray
Transpario Blue
```

Preserve actual existing site values when available.

---

## Typography

Reuse the existing font if identifiable.

Create consistent:

```text
Hero
H1
H2
H3
Body
Small
Label
```

styles.

---

## Components

Build reusable:

```text
Button
Badge
Input
Container
Section
Divider
```

Do not duplicate styling across pages.

---

## Validation

Before continuing:

- Header visually matches existing brand.
- Buttons visually match existing brand.
- Typography feels consistent.
- Borders are consistent.
- Mobile behavior works.

---

# 7. Phase 3 — Sanity CMS

## Goal

Set up the content infrastructure before building content-dependent pages.

---

## Document Types

Implement:

```text
internshipPlatform
internshipProgram
studentReview
faq
page
siteSettings
```

Follow:

```text
SANITY_SCHEMA.md
```

exactly unless a technical adjustment is required.

---

## Tasks

1. Configure Sanity project.
2. Configure dataset.
3. Configure schemas.
4. Add validation.
5. Configure Studio.
6. Configure previews where useful.
7. Create Sanity client.
8. Create image helper.
9. Create GROQ query layer.
10. Create TypeScript types.

---

## Studio Structure

Recommended:

```text
TRANSPARIO
│
├── Internship Platforms
├── Internship Programs
├── Student Reviews
├── FAQs
├── Pages
└── Site Settings
```

Keep Studio simple.

---

# 8. Phase 3.1 — Sanity Publication Rules

Public content must satisfy:

```text
publicationStatus == "published"
```

and:

```text
founderApproved == true
```

Student reviews must also satisfy publication requirements.

---

## Important

Draft documents must never appear publicly.

Private fields must never be rendered publicly.

Examples:

```text
sourceNotes
internalEvidenceReference
reviewedBy
private contact information
internal moderation notes
```

---

# 9. Phase 3.2 — Seed Development Data

Create only clearly fictional development data.

Example:

```text
TEST — Example Platform
TEST — Example Internship
TEST — Example Student Review
```

Mark them clearly.

Never create fabricated real company information.

Ensure test content cannot accidentally appear in production.

---

# 10. Phase 4 — Core Layout

## Goal

Build the shared site shell.

Implement:

```text
Header
Footer
Container
Section
Navigation
Mobile Menu
```

---

## Header

Use the existing Transpario visual language.

Desktop:

```text
TRANSPARIO

Explore
How It Works
About

Review an Internship
```

Mobile:

```text
TRANSPARIO
MENU
```

---

## Footer

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

Use Sanity Site Settings where appropriate.

---

# 11. Phase 5 — Homepage

## Goal

Build the main public entry point.

---

## Sections

Implement:

```text
Hero
↓
What Should You Know?
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

---

## Hero

Use:

```text
KNOW BEFORE YOU APPLY.
```

Supporting:

```text
Understand internship opportunities through structured information and real student experiences.
```

CTAs:

```text
EXPLORE INTERNSHIPS
REVIEW AN INTERNSHIP
```

---

## Recently Reviewed

Query Sanity:

```text
published internships
+
founder approved
+
ordered by lastReviewed desc
```

Use reusable `InternshipCard`.

---

## Review CTA

Link to:

```text
siteSettings.googleFormUrl
```

Do not hard-code the URL.

---

# 12. Phase 6 — Explore Page

## Goal

Create the internship discovery interface.

Route:

```text
/explore
```

---

## Layout

Desktop:

```text
SEARCH
----------------------------

FILTERS       RESULTS
              CARD
              CARD
              CARD
```

Mobile:

```text
SEARCH
FILTERS
RESULTS
```

---

## Search

Search:

```text
Company
Platform
Internship
Role
Domain
```

---

## Filters

Implement:

```text
Domain
Mode
Payment
Certificate
Stipend
Duration
Selection
```

---

## Sorting

Implement:

```text
Recently Reviewed
Recently Added
Alphabetical
```

---

## Empty State

Use:

```text
NO INTERNSHIPS FOUND.

Try a different search or remove some filters.

[RESET FILTERS]
```

---

# 13. Phase 6.1 — Explore State Management

Keep filtering simple.

Do not introduce a complex state-management library.

For MVP, use appropriate:

- URL search parameters
- React state where necessary
- Server-side filtering where practical

Prefer URL parameters when they make filtered pages shareable.

Example:

```text
/explore?payment=payment_required&mode=remote
```

---

# 14. Phase 6.2 — Explore Performance

Avoid fetching unnecessary data.

For listing cards, retrieve only:

```text
name
slug
role
domain
mode
duration
paymentStatus
certificateStatus
stipendStatus
lastReviewed
platform
```

Do not fetch full student reviews for every card.

---

# 15. Phase 7 — Internship Detail Page

## Goal

Build the most information-rich public page.

Route:

```text
/internships/[slug]
```

---

## Header

Show:

```text
Company / Platform
Internship Name
Role
Domain
Mode
Duration
Last Reviewed
```

---

## Sections

Implement:

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

---

## Important

Information should be scannable.

Do not hide all important information behind tabs.

Use structured classification components.

---

# 16. Phase 7.1 — Classification Components

Create reusable:

```text
Classification
ClassificationGrid
StatusBadge
ReviewDate
```

Example:

```text
PAYMENT

PAYMENT REQUIRED
₹1,500
Mandatory
```

---

## Rules

Payment:

```text
No Fee
Payment Required
Optional Payment
Unclear
```

Certificate:

```text
Free Certificate
Certificate Available
Certificate Requires Payment
No Certificate
Not Disclosed
```

Stipend:

```text
Stipend Provided
No Stipend
Performance Based
Not Disclosed
```

Never infer missing data.

---

# 17. Phase 7.2 — Selection Process

Render ordered selection steps.

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

Use the Sanity array order.

Do not create missing stages.

---

# 18. Phase 7.3 — Student Experiences

Query only:

```text
published
+
founderApproved
```

Display:

```text
STUDENT EXPERIENCE

Review

— Anonymous Student

SUBMITTED: DATE
```

Add:

```text
Student experiences represent individual experiences and may not reflect the experience of every participant.
```

Do not calculate ratings.

---

# 19. Phase 8 — Review Flow

## Goal

Connect the public website to the Google Form.

---

# 20. Review Page

Route:

```text
/review
```

Content:

```text
HAD AN INTERNSHIP EXPERIENCE?

Your experience could help another student understand what to expect.

Submissions are reviewed before any information is published.
```

CTA:

```text
OPEN REVIEW FORM →
```

---

# 21. Google Form Integration

Read:

```text
siteSettings.googleFormUrl
```

The button should open the form.

Do not duplicate the URL.

---

# 22. No Custom Review Backend

Do NOT implement:

```text
Custom database submission
Custom authentication
Custom review API
Custom file upload backend
Custom review dashboard
```

The MVP uses:

```text
Google Forms
+
Google Sheets
+
Manual Review
+
Sanity
```

---

# 23. Phase 9 — Informational Pages

Implement:

```text
/about
/how-it-works
/guidelines
/faq
/contact
```

All five pages are in MVP scope — content for each exists in `SITE_CONTENT.md` (§38–52).

Use:

```text
SITE_CONTENT.md
```

for copy.

---

# 24. About

Sections:

```text
About Transpario
Why It Exists
We Don't Tell You What To Choose
Information Over Assumptions
Reviewed Information
```

Maintain neutral language.

---

# 25. How It Works

Show:

```text
01 Students Share
02 We Review
03 We Classify
04 We Approve
05 You Explore
```

Keep it simple.

---

# 26. Guidelines

Explain:

```text
Facts Over Accusations
No Assumptions
Student Experiences Stay Personal
Information Can Change
Evidence Matters
Privacy Matters
Publication Requires Review
```

---

# 27. FAQ

Implement expandable FAQ items if appropriate.

Questions should come from:

```text
SITE_CONTENT.md
```

FAQ content can also be managed through Sanity.

---

# 28. Phase 10 — SEO

Implement after the primary routes work.

---

## Metadata

Every page should have:

```text
title
description
canonical
Open Graph
```

---

## Internship Metadata

Template:

```text
[INTERNSHIP NAME] — [COMPANY] | Transpario
```

Description should be generated from actual data.

Do not invent claims.

---

## Sitemap

Include only public routes/content.

Do not include:

```text
draft
private
internal
unpublished
```

---

## Robots

Configure appropriately for production.

---

# 29. Phase 10.1 — Structured Data

Where appropriate, add valid structured data.

Do not mark the website as something it is not.

Do not create misleading review/rating structured data.

Because Transpario does not use numerical ratings, do not add fake aggregate ratings.

---

# 30. Phase 11 — Accessibility

Audit all public routes.

---

## Check

- Semantic HTML
- Heading hierarchy
- Keyboard navigation
- Focus states
- Form labels
- Link names
- Button names
- Alt text
- Contrast
- Reduced motion

---

# 31. Phase 11.1 — Keyboard Testing

Test:

```text
TAB
SHIFT + TAB
ENTER
SPACE
ESC
ARROW KEYS
```

where applicable.

Ensure mobile menu, filters, dialogs, and controls are usable.

---

# 32. Phase 11.2 — Screen Reader Basics

Verify:

- Page title
- Heading structure
- Navigation landmarks
- Button labels
- Form labels
- Status text
- Error messages

---

# 33. Phase 12 — Responsive QA

Test:

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

Check:

- Header
- Hero
- Buttons
- Cards
- Search
- Filters
- Internship details
- Student reviews
- Footer

---

# 34. Mobile-Specific Requirements

Ensure:

- No horizontal overflow
- Buttons are tappable
- Filters are accessible
- Cards do not become unreadably dense
- Typography remains strong
- Navigation is usable
- Long internship names wrap correctly

---

# 35. Phase 12.1 — Visual QA

Compare the new application against the existing Transpario site.

Check:

```text
Typography
Colors
Spacing
Borders
Buttons
Logo
Header
Footer
Section dividers
Overall density
```

The new application should look like the same product.

---

# 36. Phase 12.2 — Content QA

Check:

- No spelling errors
- No placeholder copy
- No fake testimonials
- No fabricated companies
- No unsupported claims
- No inconsistent classification names
- No accidental technical copy

Use the approved copy from `SITE_CONTENT.md`.

---

# 37. Phase 12.3 — Data QA

Create test cases for:

### Payment

```text
No Fee
Payment Required
Optional Payment
Unclear
```

### Certificate

```text
Free Certificate
Certificate Available
Certificate Requires Payment
No Certificate
Not Disclosed
```

### Stipend

```text
Stipend Provided
No Stipend
Performance Based
Not Disclosed
```

Make sure each renders correctly.

---

# 38. Phase 12.4 — Publication QA

Verify:

### Draft

Not visible publicly.

### Under Review

Not visible publicly.

### Approved

Not visible until publication requirements are met.

### Published + Founder Approved

Visible publicly.

### Archived

Not visible publicly.

---

# 39. Phase 12.5 — Security QA

Verify:

- No secrets committed
- No Sanity write token in browser
- No private evidence publicly accessible
- No private student email exposed
- No internal notes rendered
- No admin actions publicly available

---

# 40. Phase 12.6 — Error QA

Test:

```text
Invalid internship slug
Sanity unavailable
No internships
No reviews
Missing logo
Missing optional fields
Missing Google Form URL
```

Each should have a graceful fallback.

---

# 41. Phase 12.7 — Build QA

Run:

```text
npm run lint
npm run build
```

Fix all blocking errors.

Also verify:

```text
npm run dev
```

works from a clean installation.

---

# 42. Phase 13 — Production Preparation

Prepare:

```text
Production environment variables
Sanity production dataset
Cloudflare deployment
Custom domain
Sitemap
Robots
Analytics
```

---

# 43. Production Environment

Required configuration should be documented.

Example:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_READ_TOKEN=
```

Do not commit real values.

---

# 44. Sanity Production Checklist

Before launch:

- [ ] Correct production project
- [ ] Correct production dataset
- [ ] Schemas deployed
- [ ] Site Settings configured
- [ ] Google Form URL configured
- [ ] Logo configured
- [ ] Favicon configured
- [ ] Contact information configured
- [ ] No test content published
- [ ] Founder approval rules checked

---

# 45. Cloudflare Deployment Checklist

Prepare the application for Cloudflare deployment.

Verify:

- Build works
- Environment variables are configured
- Production domain is correct
- HTTPS works
- Sitemap uses production domain
- Canonical URLs use production domain
- No localhost references remain

Do not change DNS records without explicit authorization.

---

# 46. Analytics

If configured, use:

```text
Cloudflare Web Analytics
```

Do not add unnecessary tracking.

---

# 47. Final Production Test

Before launch, test the production environment.

## Homepage

```text
/
```

## Explore

```text
/explore
```

## Internship

```text
/internships/[slug]
```

## Review

```text
/review
```

## Informational

```text
/how-it-works
/about
/guidelines
/faq
```

---

# 48. Final Acceptance Test

A student should be able to:

```text
Open Transpario
↓
Understand the purpose
↓
Explore internships
↓
Search
↓
Filter
↓
Open an internship
↓
See payment
↓
See certificate
↓
See stipend
↓
See selection process
↓
See work
↓
See mentorship
↓
Read student experiences
↓
See Last Reviewed
↓
Submit an experience
```

The entire flow must work without requiring an account.

---

# 49. Final Technical Acceptance

The application must have:

```text
No TypeScript errors
No build errors
No blocking lint errors
No broken primary routes
No exposed secrets
No public draft content
No fabricated production data
No accidental private data exposure
Responsive UI
Accessible core interactions
Working Sanity integration
Working Google Form CTA
Working search
Working filters
Working sorting
SEO metadata
Sitemap
Robots
```

---

# 50. Recommended Milestones

Use these logical Git milestones:

```text
1. chore: initialize Transpario project
2. feat: implement Transpario design system
3. feat: integrate Sanity CMS
4. feat: build shared layout
5. feat: build homepage
6. feat: build internship explorer
7. feat: build internship detail pages
8. feat: add student experiences
9. feat: add review submission flow
10. feat: add informational pages
11. feat: add SEO
12. fix: responsive and accessibility issues
13. chore: production readiness
```

Exact commit strategy may vary.

---

# 51. What NOT to Do During Implementation

Do not:

- Rebuild the product as a generic SaaS dashboard
- Replace the existing brand
- Add unnecessary databases
- Add unnecessary APIs
- Add unnecessary state-management libraries
- Build custom authentication
- Build custom reviews
- Build numerical ratings
- Build company rankings
- Build a contributor dashboard
- Build a company dashboard
- Add payments
- Add advertisements
- Add subscriptions
- Add fabricated data
- Publish student submissions automatically

---

# 52. Decision Rules

If something is ambiguous:

### First

Check:

```text
PRD.md
```

### Then

Check:

```text
DESIGN_SYSTEM.md
SITE_CONTENT.md
SANITY_SCHEMA.md
GOOGLE_FORM_SPEC.md
```

### Then

Inspect the existing Transpario implementation.

### Finally

Choose the simplest solution that preserves:

```text
Product clarity
Brand consistency
Security
Accessibility
Performance
Maintainability
```

---

# 53. Scope Control

If a feature is not necessary for the MVP, do not build it.

Ask:

> Does this feature directly help a student understand an internship before applying?

If the answer is no, it probably belongs in the future roadmap.

---

# 54. Definition of Done

A phase is complete only when:

1. The feature is implemented.
2. It works on desktop.
3. It works on mobile.
4. It follows the design system.
5. It uses the correct data source.
6. It has appropriate error/empty states.
7. It does not expose private information.
8. It passes relevant tests.
9. It does not introduce avoidable technical debt.

---

# 55. Final Launch Checklist

## Product

- [ ] Core purpose clear
- [ ] Neutral language
- [ ] No numerical ratings
- [ ] No unsupported accusations
- [ ] Review workflow works

## Design

- [ ] Existing Transpario brand preserved
- [ ] Typography correct
- [ ] Colors correct
- [ ] Buttons correct
- [ ] Borders correct
- [ ] Spacing consistent
- [ ] Mobile responsive

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
- [ ] Drafts hidden
- [ ] Founder approval works
- [ ] Published content works

## Explore

- [ ] Search
- [ ] Filters
- [ ] Combined filters
- [ ] Sorting
- [ ] Empty state

## Internship

- [ ] Detail route
- [ ] Payment
- [ ] Certificate
- [ ] Stipend
- [ ] Selection
- [ ] Work
- [ ] Mentorship
- [ ] Reviews
- [ ] Last Reviewed

## Review

- [ ] Review page
- [ ] Google Form URL from Sanity
- [ ] CTA works

## Technical

- [ ] TypeScript
- [ ] Lint
- [ ] Build
- [ ] Error handling
- [ ] Security
- [ ] SEO
- [ ] Sitemap
- [ ] Robots

## Deployment

- [ ] Production environment variables
- [ ] Sanity production dataset
- [ ] Cloudflare deployment
- [ ] transpario.page
- [ ] HTTPS
- [ ] Production metadata
- [ ] Analytics if configured

---

# 56. Final Implementation Principle

Do not optimize for the number of features.

Optimize for the quality of the core experience:

```text
DISCOVER
   ↓
UNDERSTAND
   ↓
COMPARE
   ↓
DECIDE
```

Transpario should make internship information easier to understand without telling students what decision to make.

The final implementation should preserve the existing Transpario identity while turning it into a functional internship transparency platform.

# KNOW BEFORE YOU APPLY.
