# Transpario — Google Form Specification

**Version:** 1.0  
**Product:** Transpario  
**Form Name:** Review an Internship  
**Purpose:** Collect structured internship experiences from students for manual Transpario review.

---

# 1. Purpose

The "Review an Internship" form is the primary method for students to submit internship experiences to Transpario.

The form should collect enough structured information for the Transpario team to:

- Understand the internship/program
- Understand the student's actual experience
- Determine whether payment was required
- Understand certificate conditions
- Determine stipend information
- Understand the selection process
- Understand the work/project experience
- Understand mentorship
- Identify useful supporting evidence
- Contact the student for clarification when necessary
- Prepare accurate information for possible publication

The form is a **submission mechanism**, not a public review page.

A submission must never become public automatically.

---

# 2. Core Workflow

```text
Student
   ↓
Review an Internship
   ↓
Google Form
   ↓
Google Sheets
   ↓
Transpario Manual Review
   ↓
 ┌───────────────┬──────────────┬───────────────┐
 ↓               ↓              ↓
Needs          Rejected       Approved
Clarification                     ↓
                                  Sanity
                                    ↓
                              Founder Approval
                                    ↓
                                Published
```

---

# 3. Important Principles

## 3.1 Submission ≠ Publication

Submitting the form does not guarantee that:

- The internship will be listed
- The student's review will be published
- Every submitted statement will be accepted as fact
- Evidence will be publicly displayed

## 3.2 Neutrality

Students should be encouraged to describe what happened rather than make unsupported accusations.

Prefer:

> "I was asked to pay ₹1,500 for the program."

Avoid prompting students with:

> "Was the company a scam?"

## 3.3 Facts and Experience

The form should collect both:

### Structured facts

Examples:

- Payment required
- Certificate provided
- Stipend provided
- Interview conducted
- Project assigned

### Personal experience

Examples:

- What the student expected
- What actually happened
- What work they performed
- What problems they encountered
- What they would tell another student

These must remain distinguishable during review.

---

# 4. Google Form Settings

Recommended settings:

## Responses

- Store responses in Google Sheets.
- Enable response notifications for the Transpario review team where useful.
- Do not make responses publicly visible.
- Do not publish the response spreadsheet.

## Email Collection

Collect email address.

Reason:

- Clarification
- Verification
- Follow-up
- Duplicate submission handling

The student's email must remain private.

## Response Editing

Prefer:

> Allow response editing only if operationally useful.

If enabled, students should be informed that editing a response after submission may affect the review timeline.

## File Uploads

Enable file uploads only when appropriate.

Important:

- Inform students that uploaded evidence may contain personal information.
- Ask students to remove unnecessary sensitive information.
- Evidence should be treated as private review material.

---

# 5. Form Title

> REVIEW AN INTERNSHIP

---

# 6. Form Description

Use:

> Share your internship experience with Transpario.
>
> Your experience can help other students understand what an internship program is actually like before they apply.
>
> Please provide accurate information and be as specific as possible. If you have supporting evidence, you may provide it where appropriate.
>
> Your submission will be reviewed by the Transpario team. Submission does not guarantee publication.
>
> We do not ask you to make accusations or conclusions. Simply tell us what happened.

---

# 7. Section Structure

The form should be divided into the following sections:

```text
01 — ABOUT YOU
02 — ABOUT THE INTERNSHIP
03 — YOUR EXPERIENCE
04 — SELECTION PROCESS
05 — PAYMENT
06 — CERTIFICATE
07 — STIPEND
08 — WORK & PROJECT
09 — MENTORSHIP
10 — YOUR EXPERIENCE IN YOUR WORDS
11 — RECOMMENDATION
12 — SUPPORTING EVIDENCE
13 — CONSENT & CONTACT
```

Use sections to avoid presenting one extremely long form page.

---

# 8. Section 01 — ABOUT YOU

## Section Description

> We collect basic information so we can contact you if clarification is needed. Your personal information will not be published publicly by default.

---

## Q1. Name

**Question type:** Short answer

**Question:**

> YOUR NAME

**Required:** Yes

**Validation:** None beyond reasonable text length.

---

## Q2. Email Address

**Question type:** Email

**Question:**

> EMAIL ADDRESS

**Required:** Yes

**Purpose:**

- Clarification
- Follow-up
- Submission verification

**Public:** Never display publicly.

---

## Q3. College / University

**Question type:** Short answer

**Question:**

> COLLEGE / UNIVERSITY

**Required:** Yes

**Purpose:**

Provides basic context about the contributor.

**Public:** Do not publish automatically.

---

## Q4. Preferred Public Display Name

**Question type:** Short answer

**Question:**

> IF YOUR EXPERIENCE IS PUBLISHED, WHAT NAME SHOULD WE DISPLAY?

**Description:**

> You may enter your name, initials, or "Anonymous".

**Required:** No

Examples:

```text
Aditya
A. P.
Anonymous
```

---

## Q5. Publish Anonymously?

**Question type:** Multiple choice

**Question:**

> SHOULD YOUR EXPERIENCE BE PUBLISHED ANONYMOUSLY?

**Options:**

- Yes
- No

**Required:** Yes

Important:

Even if the student chooses a public name, the submitted email and private contact information must remain private.

---

# 9. Section 02 — ABOUT THE INTERNSHIP

## Section Description

> Tell us which internship or program you experienced.

---

## Q6. Company / Platform Name

**Question type:** Short answer

**Question:**

> COMPANY / PLATFORM NAME

**Required:** Yes

---

## Q7. Internship / Program Name

**Question type:** Short answer

**Question:**

> INTERNSHIP / PROGRAM NAME

**Required:** Yes

---

## Q8. Role

**Question type:** Short answer

**Question:**

> ROLE / POSITION

**Required:** Yes

Examples:

```text
Web Development Intern
Cybersecurity Intern
Data Analyst Intern
Marketing Intern
```

---

## Q9. Internship Website

**Question type:** Short answer

**Question:**

> INTERNSHIP / COMPANY WEBSITE

**Required:** No

**Validation:** URL

---

## Q10. Application Link

**Question type:** Short answer

**Question:**

> APPLICATION / REGISTRATION LINK

**Required:** No

**Validation:** URL

---

## Q11. How Did You Find This Internship?

**Question type:** Multiple choice

**Question:**

> HOW DID YOU FIND THIS INTERNSHIP?

**Options:**

- Company website
- LinkedIn
- Instagram
- WhatsApp
- Telegram
- College / University
- Friend / Classmate
- Email
- Job / Internship platform
- Advertisement
- Other

**Required:** Yes

If "Other":

> Please specify.

---

## Q12. Internship Start Date

**Question type:** Date

**Question:**

> WHEN DID YOUR INTERNSHIP START?

**Required:** No

---

## Q13. Internship End Date

**Question type:** Date

**Question:**

> WHEN DID YOUR INTERNSHIP END?

**Required:** No

---

## Q14. Internship Status

**Question type:** Multiple choice

**Question:**

> WHAT IS THE CURRENT STATUS OF YOUR INTERNSHIP?

**Options:**

- Completed
- Currently ongoing
- Selected but not started
- Selected but did not join
- Did not get selected
- Withdrew
- Other

**Required:** Yes

---

# 10. Section 03 — YOUR EXPERIENCE

## Section Description

> These questions help us understand what actually happened during the internship process.

---

## Q15. Were You Selected?

**Question type:** Multiple choice

**Question:**

> WERE YOU SELECTED FOR THE INTERNSHIP?

**Options:**

- Yes
- No
- Not Sure

**Required:** Yes

---

## Q16. Did You Actually Participate?

**Question type:** Multiple choice

**Question:**

> DID YOU ACTUALLY PARTICIPATE IN THE INTERNSHIP?

**Options:**

- Yes
- No
- Partially

**Required:** Yes

---

## Q17. Did the Actual Experience Match What Was Promised?

**Question type:** Multiple choice

**Question:**

> DID YOUR ACTUAL EXPERIENCE MATCH WHAT YOU WERE INITIALLY TOLD?

**Options:**

- Yes
- Mostly
- Partially
- No
- Not Sure

**Required:** Yes

---

## Q18. Explanation

**Question type:** Paragraph

**Question:**

> IF THERE WAS A DIFFERENCE, WHAT WAS DIFFERENT?

**Required:** No

**Description:**

> Describe what you were told initially and what actually happened.

---

# 11. Section 04 — SELECTION PROCESS

## Q19. How Did You Get Selected?

**Question type:** Checkboxes

**Question:**

> WHAT STEPS WERE PART OF THE SELECTION PROCESS?

**Options:**

- Direct enrollment
- Application
- Resume screening
- Aptitude test
- Technical test
- Assignment
- Interview
- HR interview
- Other
- Not disclosed / Not sure

**Required:** Yes

These options map 1:1 to the canonical Selection Process enum defined in `PRD.md` §43 and `SANITY_SCHEMA.md` §12 (`selectionProcess`). Do not add form options ("Application form", "Resume submission", etc.) that don't exist in that enum — reviewers would have nowhere to map them during classification.

---

## Q20. Was an Interview Conducted?

**Question type:** Multiple choice

**Question:**

> WAS AN INTERVIEW CONDUCTED?

**Options:**

- Yes
- No
- Not Sure

**Required:** Yes

---

## Q21. Interview Type

**Question type:** Checkboxes

**Question:**

> WHAT TYPE OF INTERVIEW WAS CONDUCTED?

**Options:**

- Technical
- HR
- Behavioral
- Managerial
- Group
- Other
- Not applicable

**Required:** No

---

## Q22. Selection Experience

**Question type:** Paragraph

**Question:**

> DESCRIBE THE SELECTION PROCESS

**Required:** No

**Description:**

> Briefly explain what happened from application to selection.

---

# 12. Section 05 — PAYMENT

## Section Description

> This section is important for understanding whether students were expected to pay money during the internship process.

> Please distinguish between mandatory payments and optional purchases or services.

---

## Q23. Was Any Payment Required?

**Question type:** Multiple choice

**Question:**

> WAS ANY PAYMENT REQUIRED FROM YOU?

**Options:**

- No
- Yes
- Optional
- Not Sure

**Required:** Yes

---

## Q24. Was the Payment Mandatory?

**Question type:** Multiple choice

**Question:**

> WAS THE PAYMENT MANDATORY FOR PARTICIPATION?

**Options:**

- Yes
- No
- Partially
- Not Sure
- Not Applicable

**Required:** Yes

---

## Q25. Payment Amount

**Question type:** Short answer

**Question:**

> HOW MUCH DID YOU PAY?

**Required:** No

**Description:**

> Enter the approximate amount if you paid anything. Include currency if necessary.

Example:

```text
₹1500
₹2999
$50
```

---

## Q26. What Was the Payment For?

**Question type:** Checkboxes

**Question:**

> WHAT WAS THE PAYMENT FOR?

**Options:**

- Internship participation
- Registration
- Training
- Course
- Certificate
- Examination
- Assessment
- Platform/program fee
- Equipment/materials
- Other
- Not Sure

**Required:** No

---

## Q27. Was the Payment Presented Before You Applied?

**Question type:** Multiple choice

**Question:**

> WHEN DID YOU FIRST LEARN ABOUT THE PAYMENT?

**Options:**

- Before applying
- During application
- After selection
- After starting
- Near completion
- Not Sure
- Not Applicable

**Required:** No

---

## Q28. Payment Experience

**Question type:** Paragraph

**Question:**

> DESCRIBE THE PAYMENT EXPERIENCE

**Required:** No

**Description:**

> Explain what you were asked to pay, when you were asked, what the payment was for, and whether you understood that it was mandatory.

---

# 13. Section 06 — CERTIFICATE

## Q29. Was a Certificate Provided?

**Question type:** Multiple choice

**Question:**

> WAS A CERTIFICATE PROVIDED?

**Options:**

- Yes
- No
- Not Sure

**Required:** Yes

---

## Q30. Was the Certificate Free?

**Question type:** Multiple choice

**Question:**

> WAS THE CERTIFICATE PROVIDED WITHOUT ADDITIONAL PAYMENT?

**Options:**

- Yes
- No
- Not Sure
- Not Applicable

**Required:** Yes

---

## Q31. Certificate Payment

**Question type:** Short answer

**Question:**

> IF PAYMENT WAS REQUIRED FOR THE CERTIFICATE, HOW MUCH?

**Required:** No

---

## Q32. Certificate Conditions

**Question type:** Paragraph

**Question:**

> WERE THERE ANY CONDITIONS FOR RECEIVING THE CERTIFICATE?

**Required:** No

Examples:

- Completion requirement
- Attendance requirement
- Additional payment
- Final assessment
- Project submission

---

# 14. Section 07 — STIPEND

## Q33. Was a Stipend Provided?

**Question type:** Multiple choice

**Question:**

> WAS A STIPEND PROVIDED?

**Options:**

- Yes
- No
- Performance based
- Not Sure

**Required:** Yes

---

## Q34. Stipend Amount

**Question type:** Short answer

**Question:**

> WHAT WAS THE STIPEND AMOUNT?

**Required:** No

---

## Q35. Stipend Type / Frequency

**Question type:** Multiple choice

**Question:**

> HOW WAS THE STIPEND STRUCTURED?

**Options:**

- Monthly
- One-time
- Weekly
- Performance based
- Project based
- Other
- Not Sure
- Not Applicable

**Required:** No

---

## Q36. Stipend Conditions

**Question type:** Paragraph

**Question:**

> WERE THERE CONDITIONS FOR RECEIVING THE STIPEND?

**Required:** No

---

# 15. Section 08 — WORK & PROJECT

## Q37. Did You Perform Actual Work?

**Question type:** Multiple choice

**Question:**

> DID YOU PERFORM WORK OR COMPLETE PROJECTS AS PART OF THE INTERNSHIP?

**Options:**

- Yes
- No
- Partially
- Not Sure

**Required:** Yes

---

## Q38. Type of Work

**Question type:** Checkboxes

**Question:**

> WHAT TYPE OF WORK DID YOU PERFORM?

**Options:**

- Real company project
- Internal project
- Personal/project-based work
- Assignments
- Training
- Research
- Documentation
- Content creation
- Administrative work
- Other
- Not Sure

**Required:** No

---

## Q39. Project Description

**Question type:** Paragraph

**Question:**

> WHAT DID YOU ACTUALLY WORK ON?

**Required:** No

**Description:**

> Describe the project, tasks, responsibilities, technologies, deliverables, or other work you performed.

---

## Q40. Was the Work Individual or Team Based?

**Question type:** Multiple choice

**Question:**

> HOW WAS THE WORK STRUCTURED?

**Options:**

- Individual
- Team
- Both
- Not Sure
- Not Applicable

**Required:** No

---

# 16. Section 09 — MENTORSHIP

## Q41. Was Mentorship Provided?

**Question type:** Multiple choice

**Question:**

> WAS MENTORSHIP PROVIDED?

**Options:**

- Dedicated mentor
- Group mentorship
- Periodic mentorship
- No mentorship
- Not Sure

**Required:** Yes

---

## Q42. Mentorship Experience

**Question type:** Paragraph

**Question:**

> HOW WAS THE MENTORSHIP EXPERIENCE?

**Required:** No

**Description:**

> If applicable, describe how often you interacted with the mentor and what kind of support was provided.

---

# 17. Section 10 — YOUR EXPERIENCE IN YOUR WORDS

## Section Description

> This is the most important open-ended section. Please describe your experience as accurately as possible.

---

## Q43. Full Experience

**Question type:** Paragraph

**Question:**

> TELL US ABOUT YOUR INTERNSHIP EXPERIENCE.

**Required:** Yes

**Description:**

> Tell us what you expected, what actually happened, what you worked on, how the selection process went, whether you paid anything, what you received, and anything another student should know before applying.

Recommended minimum response:

> Encourage detailed responses rather than enforcing an overly strict character limit.

---

## Q44. What Should Another Student Know?

**Question type:** Paragraph

**Question:**

> WHAT IS THE ONE THING YOU THINK ANOTHER STUDENT SHOULD KNOW BEFORE APPLYING?

**Required:** Yes

This creates a concise takeaway that can assist future students.

---

## Q45. Anything Unexpected?

**Question type:** Paragraph

**Question:**

> WAS THERE ANYTHING UNEXPECTED ABOUT THE INTERNSHIP?

**Required:** No

---

# 18. Section 11 — RECOMMENDATION

## Q46. Would You Recommend It?

**Question type:** Multiple choice

**Question:**

> WOULD YOU RECOMMEND THIS INTERNSHIP TO ANOTHER STUDENT?

**Options:**

- Yes
- No
- Not Sure

**Required:** Yes

---

## Q47. Why?

**Question type:** Paragraph

**Question:**

> WHY DID YOU CHOOSE THAT ANSWER?

**Required:** No

**Description:**

> Explain your recommendation based on your own experience.

---

# 19. Section 12 — SUPPORTING EVIDENCE

## Section Description

> Supporting material can help the Transpario team understand specific factual claims. Evidence is reviewed privately and is not publicly displayed by default.

---

## Q48. Do You Have Supporting Evidence?

**Question type:** Multiple choice

**Question:**

> DO YOU HAVE SUPPORTING EVIDENCE?

**Options:**

- Yes
- No
- Not Sure

**Required:** Yes

---

## Q49. Evidence Type

**Question type:** Checkboxes

**Question:**

> WHAT TYPE OF SUPPORTING INFORMATION DO YOU HAVE?

**Options:**

- Screenshot
- Email
- Message/chat
- Offer letter
- Internship document
- Certificate
- Payment receipt
- Payment request
- Website/page
- Other

**Required:** No

---

## Q50. Evidence Upload

**Question type:** File upload

**Question:**

> UPLOAD SUPPORTING EVIDENCE

**Required:** No

**Description:**

> Upload only relevant material. Please remove or hide unnecessary personal information such as phone numbers, addresses, student IDs, passwords, payment account details, or private information belonging to other people.

Recommended accepted types:

- PDF
- PNG
- JPG/JPEG
- WEBP
- DOC/DOCX where necessary

Keep the upload limit reasonable.

---

## Q51. Evidence Explanation

**Question type:** Paragraph

**Question:**

> WHAT DOES THE EVIDENCE SHOW?

**Required:** No

**Description:**

> Briefly explain what each uploaded item supports.

Example:

> "This screenshot shows the ₹1,500 payment request I received before starting the program."

---

# 20. Section 13 — CONSENT & CONTACT

## Section Description

> Please review these permissions carefully before submitting.

---

## Q52. Contact for Clarification

**Question type:** Multiple choice

**Question:**

> MAY TRANSPARIO CONTACT YOU IF CLARIFICATION IS NEEDED?

**Options:**

- Yes
- No

**Required:** Yes

---

## Q53. Use Information for Review

**Question type:** Multiple choice

**Question:**

> DO YOU ALLOW TRANSPARIO TO USE THE INFORMATION YOU SUBMITTED FOR INTERNAL REVIEW AND CLASSIFICATION?

**Options:**

- Yes
- No

**Required:** Yes

If "No", the submission should be flagged for manual handling rather than automatically discarded.

---

## Q54. Permission for Potential Publication

**Question type:** Multiple choice

**Question:**

> DO YOU ALLOW TRANSPARIO TO CONSIDER YOUR SUBMITTED INFORMATION FOR PUBLICATION?

**Options:**

- Yes
- No

**Required:** Yes

Important:

This means the student permits consideration for publication. It does NOT mean automatic publication.

---

## Q55. Publication Understanding

**Question type:** Checkbox

**Question:**

> PLEASE CONFIRM

Checkbox:

> I understand that my submission will be reviewed before publication and that Transpario may edit formatting or summarize information for clarity without changing the meaning of my experience.

**Required:** Yes

---

## Q56. Accuracy Confirmation

**Question type:** Checkbox

**Question:**

> PLEASE CONFIRM

Checkbox:

> To the best of my knowledge, the information I have submitted is accurate and based on my own experience or information available to me.

**Required:** Yes

---

# 21. Submission Confirmation

After submission, show:

> THANK YOU FOR SHARING.

> Your internship experience has been submitted to Transpario.

> Our team will review the information and may contact you if clarification is needed.

> Submission does not guarantee publication.

Optional:

> Your experience could help another student KNOW BEFORE THEY APPLY.

---

# 22. Conditional Logic

Google Forms branching should be used where it improves the experience.

## Payment

If:

> Was any payment required? = No

Skip detailed payment questions where possible.

If:

> Yes / Optional

Show:

- Mandatory?
- Amount
- Purpose
- Timing
- Payment experience

## Certificate

If:

> Certificate provided? = No

Skip detailed certificate cost questions.

If:

> Yes

Ask:

- Free?
- Cost
- Conditions

## Stipend

If:

> Stipend = Yes

Ask:

- Amount
- Frequency/type
- Conditions

If:

> No

Skip amount.

## Evidence

If:

> Supporting evidence = No

Skip upload section if Google Forms configuration permits.

---

# 23. Google Sheets Response Structure

The linked response spreadsheet should remain private.

Recommended columns will naturally be generated by Google Forms, but the Transpario team should add internal columns to the right.

## Student Submission Fields

Generated by Google Forms:

- Timestamp
- Name
- Email
- College
- Public display name
- Anonymous preference
- Company
- Internship
- Role
- Website
- Application link
- Discovery source
- Dates
- Status
- Selection
- Payment
- Certificate
- Stipend
- Work
- Mentorship
- Experience
- Recommendation
- Evidence
- Consent

## Internal Review Columns

Add:

```text
Review Status
Reviewer
Review Date
Clarification Required
Clarification Notes
Evidence Reviewed
Evidence Quality
Payment Classification
Certificate Classification
Stipend Classification
Selection Classification
Work Classification
Mentorship Classification
Proposed Platform
Proposed Internship
Proposed Public Name
Publication Decision
Founder Approval
Sanity Entry
Sanity Document ID
Last Reviewed
Internal Notes
```

---

# 24. Internal Review Statuses

Use a controlled set of values:

```text
NEW
UNDER_REVIEW
NEEDS_CLARIFICATION
CLARIFICATION_RECEIVED
APPROVED_FOR_ENTRY
REJECTED
DUPLICATE
PUBLISHED
ARCHIVED
```

---

# 25. Internal Review Process

## Step 1 — New

Submission arrives in Google Sheets.

Status:

> NEW

## Step 2 — Initial Review

Reviewer checks:

- Is the internship identifiable?
- Is the submission relevant?
- Is the information understandable?
- Is the student describing their own experience?
- Are there obvious contradictions?
- Is evidence available where useful?

Status:

> UNDER_REVIEW

## Step 3 — Clarification

If necessary:

> NEEDS_CLARIFICATION

Contact the student.

After receiving clarification:

> CLARIFICATION_RECEIVED

## Step 4 — Classification

Reviewer determines appropriate classifications based on available information.

Examples:

```text
Payment: Payment Required
Certificate: Certificate Available
Stipend: Not Disclosed
Selection: Interview
Work: Project Based
Mentorship: Periodic Mentorship
```

## Step 5 — Approval for Entry

If suitable:

> APPROVED_FOR_ENTRY

Relevant information is entered into Sanity.

## Step 6 — Founder Approval

Founder reviews the public-facing information.

If approved:

> PUBLISHED

If not:

> REJECTED

---

# 26. Classification Rules

## Payment

### No Fee

Use only when the available information supports that no student payment is required for the relevant internship.

### Payment Required

Use when available information indicates payment is mandatory.

### Optional Payment

Use when an optional paid service/product exists but payment is not required for the internship itself.

### Unclear

Use when the available information is insufficient to determine the payment requirement.

---

# 27. Certificate Rules

### Free Certificate

Use when a certificate is provided without additional payment.

### Certificate Available

Use when a certificate is available but the exact conditions are not fully established.

### Certificate Requires Payment

Use when payment is required to receive the certificate.

### No Certificate

Use only when there is sufficient information that no certificate is provided.

### Not Disclosed

Use when there is insufficient information.

---

# 28. Stipend Rules

### Stipend Provided

Use when the student received or reliable information establishes a stipend.

### No Stipend

Use only when there is sufficient evidence that the internship does not provide a stipend.

### Performance Based

Use when payment depends on performance or achievement conditions.

### Not Disclosed

Use when stipend information is unavailable.

Do not infer:

> No Stipend

from:

> No information.

---

# 29. Evidence Rules

Evidence should be evaluated for:

- Relevance
- Authenticity indicators
- Date/context
- Whether it supports the specific claim
- Whether it contains sensitive personal information
- Whether it conflicts with other evidence

Evidence should not be treated as automatically conclusive merely because it is uploaded.

---

# 30. Privacy Rules

Never publish by default:

- Email addresses
- Phone numbers
- Student IDs
- Home addresses
- Payment account details
- Private messages
- Personal documents
- Unredacted screenshots
- Personal information belonging to other people

If evidence is ever publicly referenced:

- Redact unnecessary personal information.
- Obtain appropriate permission.
- Preserve the original meaning.
- Do not expose sensitive information unnecessarily.

---

# 31. Review Quality Rules

Reject or request clarification when a submission contains:

- Obvious fabricated information
- Purely promotional content
- Personal attacks
- Hate speech
- Threats
- Unsupported serious accusations
- Information unrelated to the internship
- Spam
- Duplicate submissions
- Insufficient information to identify the internship
- Attempts to manipulate public classification

Do not reject a submission merely because the experience is negative.

Negative experiences can be useful if described accurately and handled neutrally.

---

# 32. Student Experience Editing

The Transpario team may:

- Fix grammar
- Remove unnecessary personal information
- Format the text
- Shorten repetitive sections
- Clarify structure

The team must NOT:

- Change the student's meaning
- Invent details
- Add accusations
- Turn an opinion into a factual statement
- Remove important context simply because it is inconvenient

If substantial editing is required, seek clarification from the student.

---

# 33. Duplicate Handling

Multiple students may submit experiences about the same internship.

Do not create duplicate internship programs automatically.

Instead:

```text
Existing Internship
        +
New Student Experience
        ↓
Review
        ↓
Attach experience to existing program
```

Create a new program only if the internship/program is genuinely distinct.

---

# 34. Conflicting Experiences

If students report different experiences:

Do not automatically assume one is false.

Possible reasons:

- Different batches
- Different dates
- Different roles
- Different locations
- Policy changes
- Optional versus mandatory conditions
- Different program tracks

Where appropriate, record:

- Date
- Role
- Program version
- Context

The public page may need to show that experiences can differ.

---

# 35. Outdated Information

If a student reports information from an older period:

Record the relevant date.

Do not automatically use old information as the current classification.

If current information differs:

- Update the listing
- Keep historical context where useful
- Update Last Reviewed

---

# 36. Important Student-Facing Disclaimer

The form should make this clear before submission:

> Transpario presents information based on submitted experiences and reviewed information. Internship programs can change over time. Please consider the information available at the time you apply.

---

# 37. Anti-Manipulation Rules

The form should not ask leading questions such as:

> "Did they scam you?"

Instead ask:

> "Was any payment required from you?"

Do not ask:

> "Was the company dishonest?"

Instead ask:

> "Did your actual experience match what you were initially told?"

This keeps submissions factual and useful.

---

# 38. Recommended Form Order

Final order:

```text
FORM INTRO

01 — ABOUT YOU
02 — ABOUT THE INTERNSHIP
03 — YOUR EXPERIENCE
04 — SELECTION PROCESS
05 — PAYMENT
06 — CERTIFICATE
07 — STIPEND
08 — WORK & PROJECT
09 — MENTORSHIP
10 — YOUR EXPERIENCE IN YOUR WORDS
11 — RECOMMENDATION
12 — SUPPORTING EVIDENCE
13 — CONSENT & CONTACT

SUBMIT
```

---

# 39. Minimum Required Information

The following should be required for a useful submission:

- Name
- Email
- College/University
- Company/platform
- Internship/program name
- Role
- Internship status
- Selected or not
- Payment classification
- Certificate status
- Stipend status
- Mentorship status
- Main written experience
- One key takeaway
- Recommendation
- Clarification permission
- Accuracy confirmation

Other fields should remain optional when possible to reduce abandonment.

---

# 40. Form UX Guidelines

The form should:

- Use clear section titles
- Avoid unnecessary jargon
- Explain why sensitive questions are being asked
- Keep questions specific
- Avoid leading questions
- Use conditional branching
- Make required fields obvious
- Allow detailed written responses
- Clearly explain privacy
- Clearly explain publication
- Avoid intimidating legal language

The student should feel that they are simply documenting an experience, not filing a legal complaint.

---

# 41. Form Language Style

Use:

> "Tell us what happened."

Not:

> "Provide a detailed allegation."

Use:

> "Was payment required?"

Not:

> "Were you forced to pay?"

Use:

> "Describe the selection process."

Not:

> "Was the selection process legitimate?"

Use:

> "What should another student know?"

Not:

> "What warning would you give others?"

The wording should remain neutral.

---

# 42. Final Submission Message

Recommended exact copy:

> THANK YOU FOR SHARING.
>
> Your internship experience has been submitted to Transpario.
>
> Our team will review the information and may contact you if clarification is needed.
>
> Submission does not guarantee publication.
>
> Your experience could help another student **KNOW BEFORE THEY APPLY.**

---

# 43. Developer / Antigravity Implementation Notes

The website must NOT attempt to recreate this entire form.

The website should simply:

1. Read the Google Form URL from Sanity Site Settings.
2. Use it for the "Review an Internship" CTA.
3. Open the form in the intended navigation behavior.
4. Keep the URL configurable through Sanity.

Do not hard-code the Google Form URL into multiple components.

Recommended:

```text
Sanity
  ↓
siteSettings.googleFormUrl
  ↓
Review an Internship CTA
```

---

# 44. Future Improvements

Possible future improvements:

- Automated duplicate detection
- Review submission IDs
- Contributor submissions
- Better evidence management
- Dedicated moderation dashboard
- Correction request workflow
- Student account integration
- Email confirmation
- Submission status tracking
- More advanced verification workflows

These are outside the MVP.

---

# 45. Final Principle

The form exists to answer one question:

> **What actually happened?**

The form should collect enough information to turn a student's experience into clear, neutral, structured information that another student can understand.

The entire process should support Transpario's central promise:

# KNOW BEFORE YOU APPLY.
