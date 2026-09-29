# Transpario — Product Requirements Document (PRD)

**Version:** 2.0  
**Status:** MVP Build Specification  
**Product:** Transpario  
**Domain:** transpario.page  
**Primary Motto:** KNOW BEFORE YOU APPLY.

---

## 1. Product Overview

Transpario is a neutral internship transparency platform designed to help students understand internship opportunities before applying or enrolling.

The platform presents structured information about internship programs together with real student experiences. It focuses on factual, understandable information such as:

- Whether students have to pay
- Whether a stipend is provided
- Whether a certificate is provided
- Whether a certificate requires payment
- How selection works
- Whether an interview is conducted
- What type of work or project is involved
- Whether mentorship is provided
- What previous students experienced

Transpario does **not** exist to label companies or internship programs as "fake", "scam", or "fraud" by default.

The platform's purpose is transparency, not accusation.

### Core principle

> We don't tell students what to choose. We help them understand what they're choosing.

### Primary user promise

> **KNOW BEFORE YOU APPLY.**

---

# 2. Problem Statement

Students frequently discover internship opportunities through social media, messaging groups, college communities, advertisements, and direct outreach.

Before applying, students may not clearly know:

- Whether the internship is free
- Whether payment is required
- What the payment is actually for
- Whether the internship provides meaningful work
- Whether a certificate is free or paid
- Whether there is a stipend
- How selection works
- Whether an interview is required
- Whether mentorship is available
- What previous students experienced

Information may exist online but is often scattered, promotional, incomplete, or difficult to compare.

Transpario provides a structured place where students can understand these details before making a decision.

---

# 3. Goals

## 3.1 Primary Goals

1. Create a searchable registry of internship opportunities/programs.
2. Present important internship information in a standardized format.
3. Collect real student experiences.
4. Classify factual attributes such as payment, certificate, stipend, selection, work, and mentorship.
5. Maintain a neutral and professional presentation.
6. Make information easy to scan before applying.
7. Keep evidence and sensitive submission information private.
8. Ensure public information is reviewed before publication.
9. Build a foundation that can scale beyond the MVP.

## 3.2 Secondary Goals

- Encourage students to share internship experiences.
- Allow existing information to be corrected or updated.
- Show when information was last reviewed.
- Build trust through transparent methodology.
- Create a reliable reference point for students researching internships.

---

# 4. Non-Goals

The MVP must NOT attempt to become:

- A social network
- A job portal
- A recruitment platform
- A payment platform
- A discussion forum
- A public accusation/blacklist platform
- A company-rating website
- A numerical internship ranking system
- A complex investigation platform
- A custom contributor management portal
- A custom review submission system

Avoid unnecessary complexity.

---

# 5. Target Users

## 5.1 Students

Students are the primary audience.

They want to:

- Search for internship opportunities
- Understand internship conditions
- Compare programs
- Read student experiences
- Understand payment requirements
- Understand certificates and stipends
- Decide whether to apply

## 5.2 Transpario Team

The Transpario team uses the CMS to:

- Add internship programs
- Review submissions
- Update information
- Add student experiences
- Maintain classifications
- Approve content
- Publish content

## 5.3 Contributors

Contributors may provide internship experiences and supporting evidence.

Contributors do NOT directly publish public information.

All submitted information goes through Transpario's review process.

---

# 6. Product Principles

## 6.1 Neutrality

Use factual and neutral language.

Prefer:

- Payment Required
- Optional Payment
- Not Disclosed
- Student Experience
- Information Last Reviewed

Avoid automatically using:

- Fake
- Scam
- Fraud
- Cheating
- Exploitative

Unless a separate future policy explicitly supports such terminology.

## 6.2 Facts Over Opinions

Clearly distinguish:

- Structured/factual information
- Student experience
- Transpario classification
- Unverified or undisclosed information

## 6.3 No Assumptions

Do not infer information from missing data.

For example:

If no stipend information is available, use:

> Not Disclosed

Do NOT automatically display:

> No Stipend

Similarly, if payment information is unknown:

> Unclear

## 6.4 Date Awareness

Every internship program should show:

> Last Reviewed: [date]

Information can change over time.

## 6.5 Evidence First

Evidence can be used internally to support factual classifications.

Evidence should not automatically be exposed publicly.

## 6.6 Founder Approval

No user-submitted content should become public automatically.

The publication workflow is:

```text
Student
    ↓
Review an Internship
    ↓
Google Form
    ↓
Submission Received
    ↓
Transpario Review
    ↓
Clarification / Rejected / Approved
    ↓
Sanity CMS
    ↓
Founder Approval
    ↓
Published
```

---

# 7. MVP User Journey

## Student Journey

```text
Homepage
    ↓
Explore Internships
    ↓
Search / Filter
    ↓
Internship Program
    ↓
Read structured information
    ↓
Read student experiences
    ↓
Make an informed decision
```

## Review Journey

```text
Homepage / Explore
    ↓
Review an Internship
    ↓
Google Form
    ↓
Submission
    ↓
Manual Transpario Review
    ↓
Potential clarification
    ↓
Sanity
    ↓
Founder approval
    ↓
Publication
```

---

# 8. Website Information Architecture

## Primary Navigation

The main navigation should contain:

1. Home
2. Explore
3. Review an Internship
4. How It Works
5. About

Guidelines / Methodology, FAQ, and Contact are part of the MVP (see §47) but live in the footer rather than the primary header navigation, to keep the header lean. They are not deferred to a future phase.

Post-MVP candidate for the header nav:

- Methodology (if user research shows students want it more prominent)

The navigation should remain simple.

Do not overload the header.

---

# 9. Homepage

## 9.1 Hero

The primary hero should communicate the product immediately.

### Headline

> KNOW BEFORE YOU APPLY.

### Supporting copy

> Transpario helps students understand internship programs through structured information and real student experiences.

### Primary CTA

> Explore Internships

### Secondary CTA

> Review an Internship

The hero should be visually strong but not overloaded.

---

## 9.2 Why Transpario

Explain the problem in a concise manner.

Example:

> Internship information should not be difficult to understand.

Show several information categories:

- Payment
- Certificate
- Stipend
- Selection
- Work
- Mentorship

---

## 9.3 Recently Reviewed

Display recently reviewed internship programs.

Each card should contain:

- Internship/program name
- Company/platform
- Domain
- Mode
- Payment status
- Stipend status
- Certificate status
- Last reviewed date

---

## 9.4 How It Works

Show the basic flow:

```text
1. Students share experiences
2. Transpario reviews submissions
3. Information is classified
4. Approved information is published
5. Students use it before applying
```

---

## 9.5 Review CTA

Encourage students who completed or experienced an internship to submit their experience.

CTA:

> REVIEW AN INTERNSHIP

Supporting message:

> Your experience could help another student make a better-informed decision.

---

## 9.6 Footer

Footer should contain:

- Transpario logo/name
- Motto
- Navigation
- About
- Guidelines / Methodology if available
- Contact
- Copyright
- Relevant legal/privacy links

---

# 10. Explore Page

The Explore page is the main discovery interface.

## 10.1 Search

Students should be able to search by:

- Company/platform
- Internship name
- Role
- Domain

Example:

```text
Search internships...
```

## 10.2 Filters

MVP filters:

### Domain

Examples:

- Software Development
- Cybersecurity
- Data Science
- AI/ML
- Web Development
- Design
- Marketing
- Finance
- Other

### Mode

- Remote
- Hybrid
- On-site
- Not Disclosed

### Payment

- No Fee
- Payment Required
- Optional Payment
- Unclear

### Certificate

- Free Certificate
- Certificate Available
- Certificate Requires Payment
- No Certificate
- Not Disclosed

### Stipend

- Stipend Provided
- No Stipend
- Performance Based
- Not Disclosed

### Duration

Examples:

- Under 1 month
- 1–3 months
- 3–6 months
- 6+ months
- Not Disclosed

This filter operates on the structured `durationCategory` field (see `SANITY_SCHEMA.md` §8), not the free-text `duration` field shown on cards and detail pages (e.g. "8 Weeks"). Both fields are set independently when a program is entered.

### Selection

Filter UI may group related steps for scannability, but every option must map to a value in the canonical Selection Process enum (see §43):

- Direct Enrollment
- Application
- Resume Screening
- Test *(covers Aptitude Test + Technical Test)*
- Assignment
- Interview *(covers Interview + HR Interview)*
- Not Disclosed

### Sort

- Recently Reviewed
- Recently Added
- Alphabetical

---

# 11. Internship Listing Card

Every internship card should be concise and scannable.

Recommended structure:

```text
[Company Logo]

INTERNSHIP NAME
Company / Platform

Domain
Mode
Duration

PAYMENT REQUIRED
STIPEND PROVIDED
CERTIFICATE AVAILABLE

Last Reviewed: DD MMM YYYY

VIEW INTERNSHIP →
```

Do not display too many fields on cards.

Detailed information belongs on the internship page.

---

# 12. Internship Detail Page

This is the most important information page.

## 12.1 Header

Display:

- Company/platform
- Internship name
- Role
- Domain
- Mode
- Duration
- Last reviewed date

## 12.2 Quick Facts

Display major facts as structured blocks.

### Payment

Allowed values:

- No Fee
- Payment Required
- Optional Payment
- Unclear

If payment is required:

Show:

- Amount, if known
- What payment is for, if known
- Whether it is mandatory

Example:

```text
PAYMENT

Payment Required

Amount:
₹XXXX

Purpose:
Program / Training / Registration

Requirement:
Mandatory
```

Do not invent missing information.

---

# 13. Certificate Classification

Allowed values:

- Free Certificate
- Certificate Available
- Certificate Requires Payment
- No Certificate
- Not Disclosed

Where applicable, display:

- Certificate cost
- Conditions
- Whether payment is mandatory

---

# 14. Stipend Classification

Allowed values:

- Stipend Provided
- No Stipend
- Performance Based
- Not Disclosed

Where applicable:

- Amount
- Payment frequency
- Conditions

Never infer "No Stipend" from missing information.

---

# 15. Selection Process

Allowed values (canonical list — must match `SANITY_SCHEMA.md` §12 `selectionProcess` and `GOOGLE_FORM_SPEC.md` Q19 exactly):

- Direct Enrollment
- Application
- Resume Screening
- Aptitude Test
- Technical Test
- Assignment
- Interview
- HR Interview
- Other
- Not Disclosed

Display the process in an easy-to-read format.

Example:

```text
APPLICATION
   ↓
RESUME SCREENING
   ↓
TECHNICAL TEST
   ↓
INTERVIEW
   ↓
SELECTION
```

Only show stages that are actually known.

---

# 16. Work / Internship Experience

Allowed values:

- Project Based
- Real Company Project
- Internal Project
- Assignment Based
- Training Based
- Research Based
- Not Disclosed

Additional information may include:

- Project description
- Tasks
- Technologies used
- Deliverables
- Whether work was individual or team based

---

# 17. Mentorship

Allowed values:

- Dedicated Mentor
- Group Mentorship
- Periodic Mentorship
- No Mentorship
- Not Disclosed

---

# 18. Student Reviews

Student experiences should be clearly separated from structured classifications.

Example:

```text
STUDENT EXPERIENCE

"Written experience submitted by a student..."

— Student / Anonymous

Submitted:
DD MMM YYYY
```

The UI must communicate that a student review is an individual's experience and does not necessarily represent every participant's experience.

Possible labels:

- Student Experience
- Submitted Experience
- Community Experience

Avoid presenting individual opinions as official facts.

---

# 19. Recommendation

A student may submit:

- Yes
- No
- Not Sure

This should be shown as an individual recommendation.

Do NOT calculate a numerical company score in the MVP.

---

# 20. Review an Internship

The CTA "Review an Internship" must open an external Google Form.

The MVP should NOT implement a custom review form or custom authentication flow.

## Google Form Information

### Personal Information

- Name
- Email
- College / University

### Internship Information

- Company / Platform
- Internship name
- Role
- Website/application link
- How the student found it

### Experience

- Were you selected?
- Did you complete the internship?
- Selection process
- Was there an interview?
- Did you work on an actual project?
- Was mentorship provided?

### Payment

- Was any payment required?
- Amount
- What was the payment for?
- Was it mandatory?

### Certificate

- Was a certificate provided?
- Was it free?
- Was additional payment required?

### Stipend

- Was a stipend provided?
- Amount
- Type

### Written Experience

Large text field:

> Tell us about your internship experience.

Encourage students to explain:

- What they expected
- What actually happened
- What work they performed
- Whether they had to pay
- Certificate conditions
- Stipend
- Mentorship
- Anything another student should know

### Recommendation

- Yes
- No
- Not Sure

### Evidence

Optional uploads:

- Screenshots
- Emails
- Messages
- Offer letters
- Certificates
- Payment receipts
- Internship documents
- Other relevant evidence

### Consent

- Permission to contact for clarification
- Permission to use information for Transpario review/classification/publication

---

# 21. Submission Handling

Google Form submissions should initially remain private.

They may be reviewed manually.

Possible outcomes:

### Needs Clarification

Transpario contacts the submitter for additional information.

### Rejected

The submission does not meet quality or verification requirements.

### Approved

Relevant information can be entered into Sanity.

### Published

Content has passed founder approval and is publicly visible.

---

# 22. Evidence Handling

Evidence may contain sensitive information.

Examples:

- Email addresses
- Phone numbers
- Personal names
- Student IDs
- Payment details
- Private conversations
- Documents

Rules:

1. Do not expose private evidence publicly by default.
2. Remove/redact sensitive information before any public use.
3. Use evidence internally to support classifications.
4. Never fabricate evidence.
5. Never alter evidence in a misleading manner.
6. Do not publish personal information without appropriate consent.

---

# 23. Sanity CMS

Sanity is the content management system for public Transpario data.

## Content Types

### 23.1 Internship Platform

Fields:

- name
- slug
- logo
- website
- description
- industry/domain
- status
- lastReviewed
- internshipPrograms

### 23.2 Internship Program

Fields:

- platform
- name
- slug
- role
- description
- domain
- mode
- duration
- paymentStatus
- paymentAmount
- paymentReason
- paymentMandatory
- certificateStatus
- certificateCost
- stipendStatus
- stipendAmount
- selectionProcess
- workType
- workDescription
- mentorship
- studentReviews
- verificationStatus
- lastReviewed
- published

### 23.3 Student Review

Fields:

- internship
- displayName
- anonymous
- experience
- paymentExperience
- certificateExperience
- stipendExperience
- selectionExperience
- projectExperience
- mentorshipExperience
- recommendation
- verificationStatus
- internalEvidenceReference
- publicationStatus
- submittedDate
- publishedDate

### 23.4 FAQ

Fields:

- question
- answer
- category
- order
- published

### 23.5 Page

Used for:

- About
- How It Works
- Methodology
- Guidelines
- Contact information where appropriate

Fields:

- title
- slug
- content
- published

### 23.6 Site Settings

Fields:

- siteName
- tagline
- logo
- favicon
- contactEmail
- googleFormUrl
- socialLinks
- footerContent

---

# 24. CMS Publication Workflow

The CMS should support a clear editorial workflow.

Conceptually:

```text
DRAFT
  ↓
INTERNAL REVIEW
  ↓
FOUNDER APPROVAL
  ↓
PUBLISHED
```

Only authorized administrators should be able to publish content.

Public visitors must never be able to modify Sanity content.

---

# 25. Admin Requirements

The MVP does not require a custom admin dashboard.

Sanity Studio can act as the initial administration interface.

Admins should be able to:

- Create internship platforms
- Create internship programs
- Edit classifications
- Add reviews
- Update review status
- Update last reviewed date
- Publish/unpublish content
- Manage FAQs
- Manage pages
- Manage site settings

---

# 26. About Page

The About page should explain:

- What Transpario is
- Why it exists
- Who it helps
- How information is collected
- How information is reviewed
- Why the platform uses neutral classifications
- Why student experiences are useful
- The importance of reviewing information before applying

Core message:

> Transpario does not decide for students. It helps students understand the information available to them.

---

# 27. How It Works Page

Explain the platform using a simple process.

```text
01
Students share experiences

02
Transpario reviews submissions

03
Information is classified

04
Relevant information is added to the registry

05
Approved information is published

06
Students can use it before applying
```

Keep the explanation understandable to a college student.

---

# 28. Methodology / Guidelines

A methodology page should explain how Transpario handles information.

Principles:

- Neutral language
- Evidence where possible
- Student experiences clearly labeled
- No assumptions
- No fabricated information
- Date-aware information
- Corrections welcomed
- Public information requires review
- Sensitive evidence remains private

Example:

> "Not Disclosed" means Transpario does not currently have sufficient information to make that classification. It does not necessarily mean the feature does not exist.

---

# 29. Design Requirements

The existing Transpario website is the primary visual reference.

The new application should feel like an evolution of the existing website, not a completely different product.

## Existing visual direction

The current site uses:

- Black/dark background
- White typography
- Strong uppercase headings
- Minimal layout
- Thin borders
- Blue accent color
- White buttons with blue offset/shadow treatment
- Large editorial hero typography
- High contrast
- Minimal decorative elements
- Clean navigation
- Slight brutalist/editorial character

These characteristics should be retained and refined.

## Important

Before implementation, inspect the existing Transpario site and, if source code is available, inspect the existing codebase.

Do NOT replace the existing brand identity with a generic SaaS design.

---

# 30. Design Language

## Colors

Use the existing site's visual identity as the source of truth.

Primary direction:

- Black / near-black background
- White / off-white text
- Muted gray secondary text
- Existing Transpario blue accent

Do not introduce a large unrelated color palette.

## Typography

Use strong, bold, uppercase typography for major headings where appropriate.

Body text should remain readable and accessible.

Maintain clear hierarchy between:

- Hero headings
- Section headings
- Card headings
- Metadata
- Body copy
- Labels

## Buttons

Buttons should follow the existing visual language.

Preferred characteristics:

- Strong rectangular form
- High contrast
- Minimal radius
- Clear hover state
- Existing blue accent treatment where appropriate

## Cards

Cards should be:

- Structured
- Border-based
- High contrast
- Easy to scan
- Minimal rounded corners

Avoid excessive floating/glass effects.

## Layout

Use:

- Strong grid structure
- Generous whitespace
- Clear section boundaries
- Consistent content width
- Responsive layouts

---

# 31. Responsive Design

The entire website must work on:

- Desktop
- Laptop
- Tablet
- Mobile

Mobile is not an afterthought.

The Explore interface should remain usable on small screens.

Filters may become:

- collapsible
- drawer-based
- stacked

depending on the final UI implementation.

Navigation should convert into an appropriate mobile navigation pattern.

---

# 32. Accessibility

The website should follow good accessibility practices.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Accessible buttons
- Accessible form controls
- Descriptive links
- Image alt text
- Reduced-motion consideration
- Proper heading hierarchy

---

# 33. Search and Filtering

Search should operate over published internship data.

Search fields:

- Internship name
- Company/platform
- Role
- Domain

Filters should combine logically.

Example:

```text
Search: Cybersecurity

Payment: No Fee

Mode: Remote

Stipend: Stipend Provided
```

Results should update without requiring unnecessarily complicated interactions.

For the MVP, search can be implemented using frontend/server-side filtering over Sanity data.

Do not introduce a dedicated search engine unless it becomes necessary.

---

# 34. SEO

Every public internship page should have:

- Unique title
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter/social metadata where applicable
- Clean slug
- Sitemap inclusion
- Robots configuration

Example:

```text
/transpario
/explore
/internships/[slug]
/how-it-works
/about
```

Structured data can be added where appropriate.

Do not use misleading SEO claims.

---

# 35. Performance

The website should prioritize:

- Fast page loads
- Optimized images
- Responsive images
- Minimal client-side JavaScript
- Server-side rendering/static generation where appropriate
- Efficient Sanity queries
- Lazy loading where useful

Avoid unnecessary libraries.

---

# 36. Technology Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

## CMS

- Sanity

## Review Collection

- Google Forms
- Google Sheets for responses

## Hosting

- Cloudflare

## Source Control

- GitHub

## Analytics

- Cloudflare Web Analytics

The MVP should aim for $0 recurring infrastructure cost where practical.

---

# 37. Architecture

Recommended architecture:

```text
                    transpario.page
                          |
                       Cloudflare
                          |
                       Next.js
                          |
             +------------+------------+
             |                         |
          Sanity                  Google Form
             |                         |
      Public Content              Google Sheets
             |                         |
             +------------+------------+
                          |
                    Manual Review
                          |
                   Founder Approval
                          |
                       Sanity
                          |
                      Published
```

---

# 38. What Sanity Should NOT Control

Sanity should not be responsible for:

- Navbar functionality
- Authentication
- Search algorithms
- Filtering logic
- UI components
- Animations
- General application logic
- Responsive behavior

Sanity controls content.

The Next.js application controls presentation and behavior.

---

# 39. Security

The application should:

- Keep Sanity write access private
- Never expose privileged Sanity credentials in the browser
- Use environment variables for secrets
- Never expose Google Form administrative information
- Avoid storing sensitive evidence in public assets
- Validate external links
- Sanitize/render rich text safely
- Prevent unauthorized publishing

---

# 40. Error and Empty States

The application must handle:

### No Search Results

Show:

> No internships found.

Then suggest:

- Try a different search
- Remove filters
- Review an internship

### Missing Information

Show:

> Not Disclosed

instead of blank spaces.

### Failed Data Fetch

Show a clear user-friendly error state.

Do not expose technical stack traces.

### Missing Logo

Use a consistent fallback rather than a broken image.

---

# 41. Loading States

Use appropriate loading states for:

- Explore results
- Internship pages
- Search/filter updates
- Sanity content

Loading states should match the existing visual identity.

Avoid excessive skeleton UI if simple loading behavior is sufficient.

---

# 42. Content Rules

Public copy should be:

- Clear
- Neutral
- Professional
- Concise
- Student-friendly

Avoid:

- Aggressive language
- Sensational claims
- Unverified accusations
- Marketing-style exaggeration
- Fear-based messaging

---

# 43. Data Classification Rules

## Payment

```text
NO_FEE
PAYMENT_REQUIRED
OPTIONAL_PAYMENT
UNCLEAR
```

## Certificate

```text
FREE_CERTIFICATE
CERTIFICATE_AVAILABLE
CERTIFICATE_REQUIRES_PAYMENT
NO_CERTIFICATE
NOT_DISCLOSED
```

## Stipend

```text
STIPEND_PROVIDED
NO_STIPEND
PERFORMANCE_BASED
NOT_DISCLOSED
```

## Selection

```text
DIRECT_ENROLLMENT
APPLICATION
RESUME_SCREENING
APTITUDE_TEST
TECHNICAL_TEST
ASSIGNMENT
INTERVIEW
HR_INTERVIEW
OTHER
NOT_DISCLOSED
```

This is the canonical 10-value Selection Process enum. It must stay identical across `PRD.md`, `SANITY_SCHEMA.md` (`selectionProcess`), and `GOOGLE_FORM_SPEC.md` (Q19). If a value is added or removed, update all three documents in the same change.

## Work

```text
PROJECT_BASED
REAL_COMPANY_PROJECT
INTERNAL_PROJECT
ASSIGNMENT_BASED
TRAINING_BASED
RESEARCH_BASED
NOT_DISCLOSED
```

## Mentorship

```text
DEDICATED_MENTOR
GROUP_MENTORSHIP
PERIODIC_MENTORSHIP
NO_MENTORSHIP
NOT_DISCLOSED
```

---

# 44. No Numerical Rating in MVP

Do not implement:

- 1–5 star ratings
- Overall scores
- Company rankings
- Leaderboards
- "Best internship" lists

The MVP should focus on structured information.

A student's recommendation is an individual opinion, not a platform score.

---

# 45. Corrections and Updates

Public information should be updateable.

If information changes:

1. Update the Sanity record.
2. Update the Last Reviewed date.
3. Preserve appropriate historical context where needed.
4. Do not silently rewrite student experiences to change their meaning.

Future versions may add a public correction request workflow.

---

# 46. Privacy

Do not publicly display:

- Student email addresses
- Phone numbers
- Personal documents
- Private messages
- Student IDs
- Payment account details
- Sensitive personal information

Anonymous student reviews should be supported.

---

# 47. MVP Scope Summary

## Must Have

### Pages

- Home
- Explore
- Internship Detail
- Review an Internship redirect
- How It Works
- About
- Guidelines / Methodology
- FAQ
- Contact

### Functionality

- Search
- Filtering
- Internship listings
- Internship details
- Structured classifications
- Student experiences
- Last reviewed dates
- Sanity CMS
- Google Form integration
- Responsive UI
- SEO
- Accessibility

### Content Management

- Internship platforms
- Internship programs
- Reviews
- Pages
- FAQs
- Site settings

---

# 48. Explicitly Out of Scope for MVP

Do NOT build:

- User accounts
- Student dashboards
- Contributor dashboards
- Custom review form backend
- Social login
- Messaging
- Comments
- Likes
- Follows
- Company accounts
- Company dashboards
- Automated investigations
- AI-generated accusations
- Numerical rankings
- Paid listings
- Advertising system
- Subscription system
- Payment gateway
- Complex moderation dashboard
- Dedicated database if Sanity is sufficient

---

# 49. Future Roadmap

Potential future features:

## Phase 2

- Correction requests
- Better review moderation
- Contributor onboarding system
- Admin dashboard
- More detailed verification history
- Advanced search

## Phase 3

- Student accounts
- Saved internships
- Personalized discovery
- Notifications
- Internship comparison

## Phase 4

- Public methodology reports
- Analytics
- Contributor reputation
- More advanced evidence workflows
- Organization/company response mechanism

These features should NOT delay the MVP.

---

# 50. MVP Success Criteria

The MVP is successful when a student can:

1. Open Transpario.
2. Understand its purpose immediately.
3. Search for an internship.
4. Filter internship results.
5. Open an internship.
6. Understand whether payment is required.
7. Understand certificate conditions.
8. Understand stipend information.
9. Understand selection process.
10. Read student experiences.
11. See when information was last reviewed.
12. Submit their own internship experience through the Google Form.

The Transpario team must be able to:

1. Receive submissions.
2. Review submissions manually.
3. Add/update internship information in Sanity.
4. Add approved student experiences.
5. Approve content before publication.
6. Publish and update listings.

---

# 51. Acceptance Criteria

## Homepage

- Loads correctly on desktop and mobile.
- Existing Transpario visual identity is preserved.
- Hero clearly communicates the purpose.
- Explore CTA works.
- Review an Internship CTA works.
- Navigation works.
- Footer works.

## Explore

- Search works.
- Filters work.
- Published internship programs appear.
- Empty states work.
- Mobile layout works.

## Internship Detail

- All available structured information is displayed.
- Missing information displays "Not Disclosed" or the appropriate neutral state.
- Student experiences are clearly labeled.
- Last Reviewed date is visible.
- Page has SEO metadata.

## Review Flow

- Review an Internship opens the configured Google Form.
- No custom review backend is required.

## CMS

- Sanity schemas exist.
- Internship programs can be created and edited.
- Reviews can be created and edited.
- Pages can be managed.
- Published content appears on the website.

## Quality

- No TypeScript errors.
- No build errors.
- No broken routes.
- No exposed secrets.
- Responsive on major screen sizes.
- Basic accessibility requirements are satisfied.
- Production build succeeds.

---

# 52. Development Principles for Antigravity

Before writing code:

1. Read this entire PRD.
2. Inspect the existing Transpario website.
3. Inspect the existing source repository if provided.
4. Identify the current typography, colors, spacing, borders, buttons, navigation, logo treatment, and visual patterns.
5. Preserve the existing brand identity.
6. Do not blindly replace the current design.
7. Plan the component architecture.
8. Plan Sanity schemas.
9. Then begin implementation.

During development:

- Keep components reusable.
- Keep the codebase simple.
- Avoid unnecessary dependencies.
- Avoid overengineering.
- Prefer server-side functionality where appropriate.
- Keep content separate from presentation.
- Keep secrets server-side.
- Build mobile-first.
- Test every major route.
- Fix errors before moving to the next stage.

---

# 53. Final Product Direction

Transpario should feel like a serious, independent information platform.

It should not feel like:

- A generic startup landing page
- A social media platform
- A recruitment marketplace
- A review/complaint website
- A corporate HR portal
- A generic SaaS dashboard

It should feel:

- Clear
- Trustworthy
- Neutral
- Editorial
- Structured
- Modern
- Direct
- Student-focused

The interface should make important internship information immediately understandable.

The product's central message remains:

# KNOW BEFORE YOU APPLY.

---

# 54. Final Build Instruction

Build the Transpario MVP as a complete production-ready web application based on this PRD.

The existing Transpario website is the visual source of truth.

Do not invent an unrelated visual identity.

Do not overengineer the MVP.

Do not introduce features outside the defined scope unless they are required for reliability, accessibility, security, SEO, or basic production quality.

Prioritize:

1. Clarity
2. Neutrality
3. Information quality
4. Ease of discovery
5. Strong existing Transpario branding
6. Mobile responsiveness
7. Performance
8. Accessibility
9. Maintainability

The final application should make it easy for a student to answer:

> **"What am I actually signing up for?"**

before they apply.
