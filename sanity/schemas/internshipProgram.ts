import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'internshipProgram',
  title: 'Internship Program',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'reference',
      to: [{ type: 'internshipPlatform' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Remote', value: 'remote' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'Onsite', value: 'onsite' },
          { title: 'Not Disclosed', value: 'not_disclosed' },
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'durationCategory',
      title: 'Duration Category',
      type: 'string',
      options: {
        list: [
          { title: 'Under 1 Month', value: 'under_1_month' },
          { title: '1-3 Months', value: 'one_to_three_months' },
          { title: '3-6 Months', value: 'three_to_six_months' },
          { title: '6+ Months', value: 'six_plus_months' },
          { title: 'Not Disclosed', value: 'not_disclosed' },
        ],
      },
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'No Fee', value: 'no_fee' },
          { title: 'Payment Required', value: 'payment_required' },
          { title: 'Optional Payment', value: 'optional_payment' },
          { title: 'Unclear', value: 'unclear' },
        ],
      },
    }),
    defineField({
      name: 'paymentAmount',
      title: 'Payment Amount',
      type: 'string',
    }),
    defineField({
      name: 'paymentCurrency',
      title: 'Payment Currency',
      type: 'string',
    }),
    defineField({
      name: 'paymentReason',
      title: 'Payment Reason',
      type: 'string',
    }),
    defineField({
      name: 'paymentMandatory',
      title: 'Payment Mandatory',
      type: 'boolean',
    }),
    defineField({
      name: 'paymentDetails',
      title: 'Payment Details',
      type: 'text',
    }),
    defineField({
      name: 'certificateStatus',
      title: 'Certificate Status',
      type: 'string',
      options: {
        list: [
          { title: 'Free Certificate', value: 'free_certificate' },
          { title: 'Certificate Available', value: 'certificate_available' },
          { title: 'Certificate Requires Payment', value: 'certificate_requires_payment' },
          { title: 'No Certificate', value: 'no_certificate' },
          { title: 'Not Disclosed', value: 'not_disclosed' },
        ],
      },
    }),
    defineField({
      name: 'certificateCost',
      title: 'Certificate Cost',
      type: 'string',
    }),
    defineField({
      name: 'certificateDetails',
      title: 'Certificate Details',
      type: 'text',
    }),
    defineField({
      name: 'stipendStatus',
      title: 'Stipend Status',
      type: 'string',
      options: {
        list: [
          { title: 'Stipend Provided', value: 'stipend_provided' },
          { title: 'No Stipend', value: 'no_stipend' },
          { title: 'Performance Based', value: 'performance_based' },
          { title: 'Not Disclosed', value: 'not_disclosed' },
        ],
      },
    }),
    defineField({
      name: 'stipendAmount',
      title: 'Stipend Amount',
      type: 'string',
    }),
    defineField({
      name: 'stipendFrequency',
      title: 'Stipend Frequency',
      type: 'string',
    }),
    defineField({
      name: 'stipendDetails',
      title: 'Stipend Details',
      type: 'text',
    }),
    defineField({
      name: 'selectionProcess',
      title: 'Selection Process',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Direct Enrollment', value: 'direct_enrollment' },
          { title: 'Application', value: 'application' },
          { title: 'Resume Screening', value: 'resume_screening' },
          { title: 'Aptitude Test', value: 'aptitude_test' },
          { title: 'Technical Test', value: 'technical_test' },
          { title: 'Assignment', value: 'assignment' },
          { title: 'Interview', value: 'interview' },
          { title: 'HR Interview', value: 'hr_interview' },
          { title: 'Other', value: 'other' },
          { title: 'Not Disclosed', value: 'not_disclosed' },
        ],
      },
    }),
    defineField({
      name: 'selectionDetails',
      title: 'Selection Details',
      type: 'text',
    }),
    defineField({
      name: 'workType',
      title: 'Work Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Project Based', value: 'project_based' },
          { title: 'Real Company Project', value: 'real_company_project' },
          { title: 'Internal Project', value: 'internal_project' },
          { title: 'Assignment Based', value: 'assignment_based' },
          { title: 'Training Based', value: 'training_based' },
          { title: 'Research Based', value: 'research_based' },
          { title: 'Other', value: 'other' },
          { title: 'Not Disclosed', value: 'not_disclosed' },
        ],
      },
    }),
    defineField({
      name: 'workDescription',
      title: 'Work Description',
      type: 'text',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mentorship',
      title: 'Mentorship',
      type: 'string',
      options: {
        list: [
          { title: 'Dedicated Mentor', value: 'dedicated_mentor' },
          { title: 'Group Mentorship', value: 'group_mentorship' },
          { title: 'Periodic Mentorship', value: 'periodic_mentorship' },
          { title: 'No Mentorship', value: 'no_mentorship' },
          { title: 'Not Disclosed', value: 'not_disclosed' },
        ],
      },
    }),
    defineField({
      name: 'mentorshipDetails',
      title: 'Mentorship Details',
      type: 'text',
    }),

    defineField({
      name: 'verificationStatus',
      title: 'Verification Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Reviewed', value: 'not_reviewed' },
          { title: 'Under Review', value: 'under_review' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Verified', value: 'verified' },
          { title: 'Needs Update', value: 'needs_update' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publicationStatus',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Under Review', value: 'under_review' },
          { title: 'Approved', value: 'approved' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founderApproved',
      title: 'Founder Approved',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed By',
      type: 'string',
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Reviewed At',
      type: 'datetime',
    }),
    defineField({
      name: 'lastReviewed',
      title: 'Last Reviewed',
      type: 'datetime',
    }),
    defineField({
      name: 'sourceNotes',
      title: 'Source Notes',
      type: 'text',
    }),
    defineField({
      name: 'sourceUrls',
      title: 'Source URLs',
      type: 'array',
      of: [{ type: 'url' }],
    }),
  ],
});
