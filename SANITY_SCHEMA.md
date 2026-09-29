# Transpario — Sanity Schema Specification

**Version:** 1.0  
**Product:** Transpario  
**CMS:** Sanity  
**Frontend:** Next.js + TypeScript  
**Domain:** transpario.page

---

# 1. Purpose

Sanity is the content management system for Transpario.

It stores and manages the public information displayed by the website, including:

- Internship platforms
- Internship programs
- Student experiences
- FAQs
- Static pages
- Site settings
- SEO metadata where useful

Sanity is the source of truth for public Transpario content.

The frontend is responsible for:

- UI
- Search
- Filtering
- Routing
- Rendering
- Responsive behavior
- Application logic

Sanity is responsible for:

- Content
- Classifications
- Editorial data
- Publication state
- Relationships between content
- Last reviewed dates

---

# 2. Core CMS Principle

The Sanity setup must remain simple.

Do not create unnecessary schemas, relationships, or workflows.

The MVP should support this flow:

```text
Google Form
      ↓
Google Sheets
      ↓
Manual Transpario Review
      ↓
Sanity Draft
      ↓
Founder Approval
      ↓
Published
```

No Google Form submission should automatically create a public Sanity document.

---

# 3. Content Types

The MVP requires these document types:

```text
1. Internship Platform
2. Internship Program
3. Student Review
4. FAQ
5. Page
6. Site Settings
```

Optional future types:

```text
7. Correction Request
8. Contributor
9. Methodology Entry
10. Organization Response
```

Do not implement future schemas unless required.

---

# 4. General Schema Conventions

Use:

- Clear field names
- Consistent slugs
- References instead of duplicated data
- Arrays for multi-value fields
- Validation where appropriate
- Descriptions for editor guidance
- Preview configurations for important documents

Use camelCase for Sanity field names.

Example:

```text
lastReviewed
paymentStatus
certificateStatus
stipendStatus
selectionProcess
```

---

# 5. Internship Platform

## Purpose

Represents the company, organization, website, or platform associated with one or more internship programs.

Example:

```text
Company / Platform
    ↓
Multiple Internship Programs
```

---

## 5.1 Fields

### name

**Type:** String

**Required:** Yes

**Description:**

> Official company/platform name.

---

### slug

**Type:** Slug

**Required:** Yes

**Source:** name

**Description:**

> URL-friendly identifier for the platform.

Example:

```text
example-company
```

---

### logo

**Type:** Image

**Required:** No

Recommended options:

- Hotspot disabled unless needed
- Metadata enabled
- Store original asset

The frontend should provide a fallback when no logo exists.

---

### website

**Type:** URL

**Required:** No

**Description:**

> Official website of the company/platform.

---

### description

**Type:** Portable Text

**Required:** No

**Description:**

> Neutral description of the company/platform.

Do not use unsupported promotional claims.

---

### domain / industry

**Type:** Array of String

**Required:** No

Examples:

```text
Software Development
Cybersecurity
Artificial Intelligence
Data Science
Web Development
Design
Marketing
Finance
Other
```

---

### status

**Type:** String / Enum

**Required:** Yes

Options:

```text
active
inactive
unknown
```

This describes the listing status in Transpario, not the legal status of the company.

---

### lastReviewed

**Type:** DateTime

**Required:** Yes

**Description:**

> Date when the platform information was last reviewed.

---

### internshipPrograms

**Type:** Array of References

**Required:** No

Reference target:

```text
internshipProgram
```

Prefer querying relationships from internship programs where appropriate rather than manually maintaining this array if that reduces duplication.

---

### published

**Type:** Boolean

**Required:** Yes

Default:

```text
false
```

---

# 6. Internship Program

## Purpose

This is the primary public document.

Each document represents a specific internship opportunity/program.

Example:

```text
Platform
    ↓
Internship Program
    ↓
Student Reviews
```

---

# 7. Internship Program — Identity Fields

## name

**Type:** String

**Required:** Yes

Example:

```text
Software Development Internship
```

---

## slug

**Type:** Slug

**Required:** Yes

**Source:** name

---

## platform

**Type:** Reference

**Required:** Yes

Target:

```text
internshipPlatform
```

This connects the program to its company/platform.

---

## role

**Type:** String

**Required:** Yes

Examples:

```text
Web Development Intern
Cybersecurity Intern
Data Analyst Intern
```

---

## description

**Type:** Portable Text

**Required:** Yes

Description should explain the internship without unsupported marketing claims.

---

# 8. Internship Program — Categorization

## domain

**Type:** Array of String

**Required:** Yes

Recommended values:

```text
software-development
cybersecurity
artificial-intelligence
machine-learning
data-science
web-development
mobile-development
design
marketing
finance
research
other
```

Multiple domains may be selected.

---

## mode

**Type:** String / Enum

**Required:** Yes

Values:

```text
remote
hybrid
onsite
not_disclosed
```

---

## duration

**Type:** String

**Required:** Yes

Examples:

```text
1 Month
3 Months
6 Months
8 Weeks
Not Disclosed
```

Do not force an artificial duration format if the original program uses another valid description.

This field is for **display only**. It is free text and must not be used to power the Explore page's Duration filter — arbitrary strings like "8 Weeks" cannot be reliably grouped into filter buckets. Use `durationCategory` (below) for filtering.

---

## durationCategory

**Type:** String / Enum

**Required:** Yes

Values:

```text
under_1_month
one_to_three_months
three_to_six_months
six_plus_months
not_disclosed
```

This is the structured field the Explore page filters against (see `PRD.md` §10.2 and `ANTIGRAVITY_BUILD_PROMPT.md` §53). It is set alongside the free-text `duration` field when a program is entered: `duration` is what students read on the card/detail page ("8 Weeks"), `durationCategory` is what the filter UI groups by (`under_1_month`). Both fields should be filled in together — never derive one from the other automatically, since that risks silently miscategorizing an edge case (e.g. "8 Weeks" is ambiguous between `under_1_month` and `one_to_three_months`; the editor decides).

---

## startDate

**Type:** Date

**Required:** No

---

## endDate

**Type:** Date

**Required:** No

---

# 9. Payment Information

Payment information must be structured separately from general description.

---

## paymentStatus

**Type:** String / Enum

**Required:** Yes

Allowed values:

```text
no_fee
payment_required
optional_payment
unclear
```

### Meaning

#### no_fee

No student payment is currently identified as required for the internship.

#### payment_required

Available information indicates that payment is required.

#### optional_payment

An optional paid product/service exists, but payment is not required for participation in the internship itself.

#### unclear

Available information is insufficient to determine the payment requirement.

---

## paymentAmount

**Type:** String

**Required:** No

Examples:

```text
₹1,500
₹2,999
$50
```

Use a string rather than numeric currency fields because payment structures may vary.

---

## paymentCurrency

**Type:** String

**Required:** No

Example:

```text
INR
USD
```

---

## paymentReason

**Type:** String / Enum or String

**Required:** No

Recommended values:

```text
internship
registration
training
course
certificate
assessment
exam
platform_fee
materials
other
not_disclosed
```

Multiple reasons may be needed in some cases.

If multiple reasons are possible, use an array.

---

## paymentMandatory

**Type:** Boolean

**Required:** No

Possible:

```text
true
false
```

Do not force this field when the requirement is unclear.

---

## paymentDetails

**Type:** Portable Text

**Required:** No

Use for contextual explanation.

Example:

> Students are required to pay ₹1,500 before participation.

Keep the wording factual.

---

# 10. Certificate Information

## certificateStatus

**Type:** String / Enum

**Required:** Yes

Values:

```text
free_certificate
certificate_available
certificate_requires_payment
no_certificate
not_disclosed
```

---

## certificateCost

**Type:** String

**Required:** No

Example:

```text
₹500
```

---

## certificateDetails

**Type:** Portable Text

**Required:** No

Examples:

- Completion requirements
- Attendance requirements
- Additional payment
- Assessment conditions

---

# 11. Stipend Information

## stipendStatus

**Type:** String / Enum

**Required:** Yes

Values:

```text
stipend_provided
no_stipend
performance_based
not_disclosed
```

---

## stipendAmount

**Type:** String

**Required:** No

Examples:

```text
₹5,000/month
₹10,000
```

---

## stipendFrequency

**Type:** String / Enum

**Required:** No

Values:

```text
monthly
weekly
one_time
project_based
performance_based
other
not_disclosed
```

---

## stipendDetails

**Type:** Portable Text

**Required:** No

Use for:

- Conditions
- Performance requirements
- Payment schedule
- Eligibility

---

# 12. Selection Process

## selectionProcess

**Type:** Array of String / Enum

**Required:** Yes

Allowed values:

```text
direct_enrollment
application
resume_screening
aptitude_test
technical_test
assignment
interview
hr_interview
other
not_disclosed
```

This is the canonical Selection Process enum. `PRD.md` §43 and `GOOGLE_FORM_SPEC.md` Q19 must present the same 10 values (case/format adapted per document). If this list changes, update both of those documents in the same change.

Ordering matters.

The array should preserve the actual sequence when known.

Example:

```text
[
  "application",
  "resume_screening",
  "technical_test",
  "interview"
]
```

The frontend may render this as:

```text
APPLICATION
      ↓
RESUME SCREENING
      ↓
TECHNICAL TEST
      ↓
INTERVIEW
```

---

## selectionDetails

**Type:** Portable Text

**Required:** No

Use for additional context.

---

# 13. Work Information

## workType

**Type:** Array of String / Enum

**Required:** Yes

Values:

```text
project_based
real_company_project
internal_project
assignment_based
training_based
research_based
other
not_disclosed
```

---

## workDescription

**Type:** Portable Text

**Required:** No

Should describe:

- Tasks
- Projects
- Responsibilities
- Deliverables
- Technologies
- Team/individual work

Do not invent information.

---

## technologies

**Type:** Array of String

**Required:** No

Examples:

```text
Python
React
Node.js
Java
Docker
```

Only include technologies supported by available information.

---

# 14. Mentorship

## mentorship

**Type:** String / Enum

**Required:** Yes

Values:

```text
dedicated_mentor
group_mentorship
periodic_mentorship
no_mentorship
not_disclosed
```

---

## mentorshipDetails

**Type:** Portable Text

**Required:** No

Use for:

- Mentor frequency
- Type of support
- Review process
- Communication structure

---

# 15. Student Reviews

## studentReviews

**Type:** Array of References

**Required:** No

Reference target:

```text
studentReview
```

Only published/approved reviews should be rendered publicly.

The frontend should filter reviews based on their publication status.

---

# 16. Verification / Editorial Status

## verificationStatus

**Type:** String / Enum

**Required:** Yes

Recommended values:

```text
not_reviewed
under_review
reviewed
verified
needs_update
```

### Important

"Verified" must have a clear internal meaning.

It should not imply that Transpario guarantees every aspect of the internship.

Use it only when the internal review process supports the classification.

---

## publicationStatus

**Type:** String / Enum

**Required:** Yes

Values:

```text
draft
under_review
approved
published
archived
```

This is the primary editorial publication state.

---

## founderApproved

**Type:** Boolean

**Required:** Yes

Default:

```text
false
```

Only set to true after the required founder approval.

---

## reviewedBy

**Type:** String

**Required:** No

Internal field.

Can store:

- Reviewer name
- Reviewer identifier

Do not display publicly unless intentionally required.

---

## reviewedAt

**Type:** DateTime

**Required:** No

Internal review timestamp.

---

## lastReviewed

**Type:** DateTime

**Required:** Yes

Public field.

This is the date displayed on the website.

---

# 17. Source Information

The CMS should allow the team to maintain internal context for where information came from.

## sourceNotes

**Type:** Portable Text

**Required:** No

Internal only.

Use for:

- Official website information
- Student submission
- Email clarification
- Supporting evidence
- Other reviewed sources

Do not automatically expose this field publicly.

---

## sourceUrls

**Type:** Array of URL

**Required:** No

Internal/reference use.

Examples:

- Official internship page
- Application page
- Public program page

---

# 18. Student Review

## Purpose

Represents an individual student's experience.

A review is not a company rating.

---

# 19. Student Review — Relationship

## internship

**Type:** Reference

**Required:** Yes

Target:

```text
internshipProgram
```

---

# 20. Student Review — Identity

## displayName

**Type:** String

**Required:** No

Examples:

```text
Aditya
A. P.
Anonymous
```

---

## anonymous

**Type:** Boolean

**Required:** Yes

Default:

```text
true
```

If true, the frontend should display:

```text
ANONYMOUS STUDENT
```

rather than the private name.

---

# 21. Student Review — Experience

## experience

**Type:** Portable Text

**Required:** Yes

This is the student's main written experience.

It must remain clearly identified as an individual experience.

---

## keyTakeaway

**Type:** Text

**Required:** No

The student's concise answer to:

> What should another student know before applying?

---

## unexpected

**Type:** Portable Text

**Required:** No

---

# 22. Student Review — Structured Experience

## selected

**Type:** String / Enum

Values:

```text
yes
no
not_sure
```

---

## completed

**Type:** String / Enum

Values:

```text
yes
no
partially
not_applicable
not_sure
```

---

## experienceMatchedExpectations

**Type:** String / Enum

Values:

```text
yes
mostly
partially
no
not_sure
```

---

# 23. Student Review — Payment

## paymentExperience

**Type:** Portable Text

**Required:** No

---

## paymentAmount

**Type:** String

**Required:** No

---

## paymentRequired

**Type:** String / Enum

Values:

```text
no
yes
optional
not_sure
```

This stores the student's reported experience.

It should not automatically become the program's official payment classification.

---

# 24. Student Review — Certificate

## certificateExperience

**Type:** Portable Text

**Required:** No

---

## certificateProvided

**Type:** String / Enum

Values:

```text
yes
no
not_sure
```

---

## certificateWasFree

**Type:** String / Enum

Values:

```text
yes
no
not_sure
not_applicable
```

---

# 25. Student Review — Stipend

## stipendExperience

**Type:** Portable Text

**Required:** No

---

## stipendProvided

**Type:** String / Enum

Values:

```text
yes
no
performance_based
not_sure
```

---

## stipendAmount

**Type:** String

**Required:** No

---

# 26. Student Review — Selection

## selectionExperience

**Type:** Array of String / Enum

Values:

```text
direct_enrollment
application
resume_screening
aptitude_test
technical_test
assignment
interview
hr_interview
other
not_sure
```

---

## interviewConducted

**Type:** String / Enum

Values:

```text
yes
no
not_sure
```

---

## interviewType

**Type:** Array of String

Examples:

```text
technical
hr
behavioral
managerial
group
other
not_applicable
```

---

# 27. Student Review — Work

## projectExperience

**Type:** Portable Text

**Required:** No

---

## workTypes

**Type:** Array of String / Enum

Values:

```text
real_company_project
internal_project
project_based
assignment_based
training_based
research_based
documentation
content_creation
administrative
other
not_sure
```

The first six values must use the same spelling as `internshipProgram.workType` (§13), since editors map a student's self-reported `workTypes` onto the program's official `workType` classification during review. `documentation`, `content_creation`, and `administrative` are additional self-report-only options with no equivalent in `workType` yet — if reviewers find these values common enough to warrant an official classification, add them to `workType` too rather than leaving the two enums to drift apart. `not_sure` (student's own uncertainty) intentionally differs from `workType`'s `not_disclosed` (Transpario's official classification when insufficient information exists) — keep that distinction.

---

# 28. Student Review — Mentorship

## mentorshipExperience

**Type:** Portable Text

**Required:** No

---

## mentorshipType

**Type:** String / Enum

Values:

```text
dedicated_mentor
group_mentorship
periodic_mentorship
no_mentorship
not_sure
```

---

# 29. Student Review — Recommendation

## recommendation

**Type:** String / Enum

**Required:** Yes

Values:

```text
yes
no
not_sure
```

---

## recommendationReason

**Type:** Portable Text

**Required:** No

This is personal opinion and must be presented as such.

---

# 30. Student Review — Evidence

Evidence references should remain internal.

## evidenceAvailable

**Type:** Boolean

**Required:** Yes

---

## evidenceDescription

**Type:** Portable Text

**Required:** No

---

## internalEvidenceReference

**Type:** String

**Required:** No

Can store:

- Google Drive reference
- Google Sheets reference
- Internal identifier
- Evidence notes

Do NOT expose publicly.

---

# 31. Student Review — Verification

## verificationStatus

**Type:** String / Enum

**Required:** Yes

Values:

```text
submitted
under_review
clarification_required
reviewed
approved
rejected
```

---

## publicationStatus

**Type:** String / Enum

**Required:** Yes

Values:

```text
draft
approved
published
hidden
rejected
```

---

## founderApproved

**Type:** Boolean

**Required:** Yes

Default:

```text
false
```

---

## submittedAt

**Type:** DateTime

**Required:** Yes

---

## reviewedAt

**Type:** DateTime

**Required:** No

---

## publishedAt

**Type:** DateTime

**Required:** No

---

# 32. Student Review — Privacy

## contactPermission

**Type:** Boolean

**Required:** Yes

Internal only.

Represents whether Transpario may contact the student for clarification.

---

## publicationPermission

**Type:** Boolean

**Required:** Yes

Internal only.

Represents whether the student allowed their information to be considered for publication.

This does NOT mean automatic publication.

---

# 33. FAQ

## Purpose

Stores frequently asked questions displayed on the website.

---

## question

**Type:** String

**Required:** Yes

---

## answer

**Type:** Portable Text

**Required:** Yes

---

## category

**Type:** String

**Required:** No

Examples:

```text
general
classification
reviews
privacy
methodology
contributors
```

---

## order

**Type:** Number

**Required:** Yes

Use for manual ordering.

---

## published

**Type:** Boolean

**Required:** Yes

Default:

```text
false
```

---

# 34. Page

## Purpose

Used for editable informational pages.

Examples:

```text
About
How It Works
Guidelines
Methodology
Contact
```

---

## title

**Type:** String

**Required:** Yes

---

## slug

**Type:** Slug

**Required:** Yes

---

## content

**Type:** Portable Text

**Required:** Yes

---

## excerpt

**Type:** Text

**Required:** No

Used for SEO or previews.

---

## seoTitle

**Type:** String

**Required:** No

---

## seoDescription

**Type:** Text

**Required:** No

---

## published

**Type:** Boolean

**Required:** Yes

Default:

```text
false
```

---

# 35. Site Settings

## Purpose

Contains global website configuration.

There should normally be only one Site Settings document.

---

## siteName

**Type:** String

**Required:** Yes

Default:

```text
Transpario
```

---

## tagline

**Type:** String

**Required:** Yes

Default:

```text
KNOW BEFORE YOU APPLY.
```

---

## logo

**Type:** Image

**Required:** Yes

Use the official Transpario logo.

---

## favicon

**Type:** Image

**Required:** No

---

## contactEmail

**Type:** Email/String

**Required:** No

Do not hard-code the production contact email in multiple frontend files.

---

## googleFormUrl

**Type:** URL

**Required:** Yes

This is the URL used by the:

> REVIEW AN INTERNSHIP

CTA.

The frontend should read this value from Sanity.

Do not duplicate the URL across components.

---

## socialLinks

**Type:** Array of Objects

Each object:

```text
platform
url
```

Possible platforms:

```text
linkedin
instagram
discord
x
other
```

Only configure platforms that actually exist.

---

## footerContent

**Type:** Portable Text

**Required:** No

---

# 36. SEO Object

A reusable SEO object may be created for:

- Pages
- Internship Platforms
- Internship Programs

Recommended fields:

```text
seoTitle
seoDescription
ogImage
noIndex
```

Do not duplicate SEO logic unnecessarily.

---

# 37. Homepage Content

The homepage can initially use a combination of static application copy and Sanity-managed content.

If editorial flexibility is desired, create a future `homepageSettings` document.

For the MVP, do not create a complex page-builder system.

Recommended approach:

```text
Static UI structure
+
Sanity content
```

The frontend controls layout.

Sanity controls editable text/data.

---

# 38. References

Relationships should use Sanity references.

Example:

```text
internshipProgram.platform
        ↓
internshipPlatform
```

and:

```text
studentReview.internship
        ↓
internshipProgram
```

Avoid copying company names into every document as the primary relationship.

---

# 39. Public vs Internal Fields

Some fields should never be exposed to the public frontend.

## Public

Examples:

- name
- role
- description
- domain
- mode
- duration
- paymentStatus
- paymentAmount
- paymentReason
- certificateStatus
- certificateCost
- stipendStatus
- stipendAmount
- selectionProcess
- workType
- workDescription
- mentorship
- student experiences
- lastReviewed

## Internal

Examples:

- sourceNotes
- internalEvidenceReference
- reviewedBy
- internal review notes
- contactPermission
- private contact details
- private evidence
- internal moderation information

The frontend queries should explicitly select public fields where practical.

---

# 40. GROQ Query Principles

Use GROQ to retrieve only the data required by each page.

Example conceptual query:

```groq
*[
  _type == "internshipProgram" &&
  publicationStatus == "published"
] | order(lastReviewed desc)
```

For a detail page:

```groq
*[
  _type == "internshipProgram" &&
  slug.current == $slug &&
  publicationStatus == "published"
][0]
```

Student reviews should be filtered:

```groq
"reviews": *[
  _type == "studentReview" &&
  references(^._id) &&
  publicationStatus == "published"
]
```

Exact queries may be adapted to the final schema implementation.

---

# 41. Draft and Publication Behavior

Sanity drafts should not appear on the public website.

Public frontend queries must use published documents only.

A program should be publicly visible only when:

```text
publicationStatus == "published"
```

and:

```text
founderApproved == true
```

Where practical, use both checks.

---

# 42. Founder Approval

Founder approval is mandatory for public content originating from student submissions.

Minimum requirement:

```text
founderApproved = true
```

before:

```text
publicationStatus = published
```

The exact internal workflow may be handled through Sanity Studio rather than building a custom admin dashboard.

---

# 43. Content Validation

Sanity should validate important fields.

Examples:

### Internship name

Required.

### Platform

Required.

### Role

Required.

### Payment status

Required.

### Certificate status

Required.

### Stipend status

Required.

### Mode

Required.

### Last reviewed

Required.

### Publication status

Required.

### Founder approval

Required.

Do not make every optional field mandatory.

---

# 44. Validation Rules

## Payment

If:

```text
paymentStatus = payment_required
```

then:

- paymentAmount should be requested where known
- paymentReason should be requested where known

Do not force these fields if the amount/reason is genuinely unknown.

## Certificate

If:

```text
certificateStatus = certificate_requires_payment
```

then:

- certificateCost should be requested where known

## Stipend

If:

```text
stipendStatus = stipend_provided
```

then:

- stipendAmount should be requested where known

Do not block publication solely because the amount is unavailable.

---

# 45. Portable Text Rules

Portable Text should be used for longer editorial content.

Good uses:

- Internship descriptions
- Payment details
- Certificate details
- Work descriptions
- Mentorship details
- Student experiences
- FAQ answers
- About
- Guidelines

Do not use Portable Text for simple enum/status fields.

---

# 46. Image Rules

## Logos

Store company/platform logos in Sanity.

Frontend should:

- Use Sanity image URLs
- Optimize dimensions
- Preserve aspect ratio
- Provide fallback
- Add appropriate alt text

## Alt Text

Where the image is meaningful:

```text
[Company Name] logo
```

For decorative images:

```text
alt=""
```

---

# 47. Slug Rules

Internship slugs must be:

- Lowercase
- URL-safe
- Stable
- Unique

Example:

```text
software-development-internship-company-name
```

Do not include temporary dates unless necessary.

Changing slugs after publication should be avoided.

---

# 48. Dates

Use Sanity `datetime` for:

- submittedAt
- reviewedAt
- publishedAt
- lastReviewed

Use `date` for:

- internship start date
- internship end date

The frontend should format dates for users.

Example:

```text
05 SEP 2026
```

or:

```text
05 Sep 2026
```

Use one consistent display format.

---

# 49. Homepage Queries

Homepage should retrieve:

- Recently reviewed internships
- Featured/curated internships if implemented
- Published FAQ entries if displayed

For recently reviewed:

```text
publicationStatus = published
founderApproved = true
order by lastReviewed desc
```

Do not add a complicated recommendation algorithm.

---

# 50. Explore Queries

Explore should retrieve published internship programs.

Potential fields:

```text
name
platform
role
domain
mode
duration
durationCategory
paymentStatus
certificateStatus
stipendStatus
selectionProcess
lastReviewed
slug
```

Filter against `durationCategory`, not `duration` — see §8.

Search and filtering can be implemented by the frontend/application layer.

Do not require a separate search database for the MVP.

---

# 51. Internship Detail Query

The detail page should retrieve:

```text
program
platform
public classifications
work
selection
mentorship
lastReviewed
published reviews
```

Do not retrieve private/internal evidence fields for the public page.

---

# 52. Student Review Display Rules

Only display reviews when:

```text
publicationStatus == published
```

and:

```text
founderApproved == true
```

The frontend should display:

- Student experience
- Display name or Anonymous Student
- Submission/publication date
- Relevant structured experience where useful

Do not display:

- Email
- Internal evidence
- Private contact details
- Internal review notes

---

# 53. Student Review Disclaimer

The public review component should include a concise contextual statement:

> Student experiences represent individual experiences and may not reflect the experience of every participant.

This should appear near the review section, not necessarily inside every review.

---

# 54. No Automatic Aggregated Rating

Do not calculate:

- Average review score
- Company rating
- Internship rating
- "Trust score"
- "Risk score"

from student reviews.

The MVP is informational, not a numerical ranking system.

---

# 55. Corrections

The MVP does not require a dedicated correction schema.

If a correction is received:

```text
Manual review
    ↓
Sanity update
    ↓
Founder approval
    ↓
Published
```

A future `correctionRequest` document may be added if the volume requires it.

---

# 56. Data Integrity

Avoid duplicate sources of truth.

For example:

Do not store:

```text
platformName
```

inside every internship program as the authoritative company relationship if:

```text
platform
```

already references the Internship Platform document.

Use the reference.

---

# 57. Recommended Studio Structure

Sanity Studio should organize content into logical groups.

Example:

```text
TRANSPARIO
│
├── Internship Platforms
│
├── Internship Programs
│
├── Student Reviews
│
├── FAQs
│
├── Pages
│
└── Site Settings
```

If Sanity Structure Builder is used, keep it simple.

---

# 58. Editor Experience

Editors should be able to understand a document without technical knowledge.

Field descriptions should explain:

- What the field means
- When to use it
- What "Not Disclosed" means
- What should not be inferred

Example description for `stipendStatus`:

> Select "Not Disclosed" when sufficient information is not available. Do not select "No Stipend" simply because no stipend information was found.

---

# 59. Neutrality Rules in CMS

The CMS should make neutral classification easy.

Use explicit options:

```text
No Fee
Payment Required
Optional Payment
Unclear
```

rather than free-text-only classification.

Likewise:

```text
Stipend Provided
No Stipend
Performance Based
Not Disclosed
```

Structured values reduce inconsistent terminology.

---

# 60. Recommended Initial Seed Data

Do not add fabricated internship programs or student reviews.

For development, use clearly marked test records such as:

```text
TEST — Example Internship
TEST — Example Platform
TEST — Example Student Review
```

These must never be published to production.

---

# 61. Environment Variables

Sanity configuration should use environment variables.

Typical variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_READ_TOKEN
```

Only expose variables that are safe to expose publicly.

Never expose private write tokens in client-side code.

---

# 62. Security

Never put:

- Sanity write tokens
- Admin credentials
- Private evidence references
- Google Sheets private access
- Private API keys

into public client-side code.

The frontend should only access data that is intended to be public.

---

# 63. GROQ and Public Data

Where possible, public queries should explicitly select fields rather than returning entire documents.

This reduces accidental exposure of internal fields.

Conceptual example:

```groq
*[
  _type == "internshipProgram" &&
  publicationStatus == "published" &&
  founderApproved == true
]{
  _id,
  name,
  slug,
  role,
  domain,
  mode,
  duration,
  paymentStatus,
  paymentAmount,
  paymentReason,
  certificateStatus,
  certificateCost,
  stipendStatus,
  stipendAmount,
  selectionProcess,
  workType,
  mentorship,
  lastReviewed,
  platform->{
    name,
    slug,
    logo,
    website
  }
}
```

Adapt the exact query to the implemented schema.

---

# 64. Migration / Existing Content

If an existing Transpario Sanity project already exists:

1. Inspect existing schemas.
2. Preserve useful existing data.
3. Avoid destructive migration without backup.
4. Map existing content to the new schema where possible.
5. Do not delete existing records simply to simplify implementation.
6. Document any migration decisions.

---

# 65. Schema Naming

Recommended Sanity document type names:

```text
internshipPlatform
internshipProgram
studentReview
faq
page
siteSettings
```

Use consistent naming throughout the project.

---

# 66. Final Schema Relationship

The primary relationship should be:

```text
                 ┌──────────────────────┐
                 │ Internship Platform  │
                 └──────────┬───────────┘
                            │
                            │ reference
                            ↓
                 ┌──────────────────────┐
                 │ Internship Program   │
                 └──────────┬───────────┘
                            │
                            │ reference
                            ↓
                 ┌──────────────────────┐
                 │   Student Review     │
                 └──────────────────────┘
```

Supporting content:

```text
FAQ
Page
Site Settings
```

---

# 67. Final MVP Schema List

The production MVP should contain:

```text
DOCUMENTS

internshipPlatform
internshipProgram
studentReview
faq
page
siteSettings
```

No additional document types are required for the initial launch.

---

# 68. Antigravity Implementation Instruction

Before implementing Sanity:

1. Read `PRD.md`.
2. Read `DESIGN_SYSTEM.md`.
3. Read `SITE_CONTENT.md`.
4. Read `GOOGLE_FORM_SPEC.md`.
5. Read this file completely.
6. Inspect any existing Sanity project/configuration.
7. Preserve existing useful data where possible.
8. Implement the schemas described here.
9. Configure validation.
10. Configure Studio structure.
11. Configure preview where useful.
12. Connect Next.js to Sanity.
13. Ensure only published + founder-approved content appears publicly.
14. Verify that internal fields cannot accidentally appear in public queries.

Do not create a custom admin dashboard for the MVP.

Sanity Studio is the initial admin/editor interface.

---

# 69. Final CMS Principle

Sanity should make Transpario easy to maintain without making the product unnecessarily complicated.

The ideal workflow is:

```text
Easy to edit
      ↓
Hard to accidentally publish
      ↓
Clear classifications
      ↓
Private evidence
      ↓
Founder approval
      ↓
Clean public information
```

The CMS exists to support Transpario's core promise:

# KNOW BEFORE YOU APPLY.
