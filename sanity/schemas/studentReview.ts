import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'studentReview',
  title: 'Student Review',
  type: 'document',
  fields: [
    defineField({
      name: 'internship',
      title: 'Internship Program',
      type: 'reference',
      to: [{ type: 'internshipProgram' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'anonymous',
      title: 'Anonymous',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'keyTakeaway',
      title: 'Key Takeaway',
      type: 'text',
    }),
    defineField({
      name: 'unexpected',
      title: 'Unexpected',
      type: 'text',
    }),
    defineField({
      name: 'selected',
      title: 'Selected',
      type: 'boolean',
    }),
    defineField({
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
    }),
    defineField({
      name: 'experienceMatchedExpectations',
      title: 'Experience Matched Expectations',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'paymentExperience',
      title: 'Payment Experience',
      type: 'text',
    }),
    defineField({
      name: 'paymentAmount',
      title: 'Payment Amount',
      type: 'string',
    }),
    defineField({
      name: 'paymentRequired',
      title: 'Payment Required',
      type: 'boolean',
    }),
    defineField({
      name: 'certificateExperience',
      title: 'Certificate Experience',
      type: 'text',
    }),
    defineField({
      name: 'certificateProvided',
      title: 'Certificate Provided',
      type: 'boolean',
    }),
    defineField({
      name: 'certificateWasFree',
      title: 'Certificate Was Free',
      type: 'boolean',
    }),
    defineField({
      name: 'stipendExperience',
      title: 'Stipend Experience',
      type: 'text',
    }),
    defineField({
      name: 'stipendProvided',
      title: 'Stipend Provided',
      type: 'boolean',
    }),
    defineField({
      name: 'stipendAmount',
      title: 'Stipend Amount',
      type: 'string',
    }),
    defineField({
      name: 'selectionExperience',
      title: 'Selection Experience',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'interviewConducted',
      title: 'Interview Conducted',
      type: 'boolean',
    }),
    defineField({
      name: 'interviewType',
      title: 'Interview Type',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'projectExperience',
      title: 'Project Experience',
      type: 'text',
    }),
    defineField({
      name: 'workTypes',
      title: 'Work Types',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mentorshipExperience',
      title: 'Mentorship Experience',
      type: 'text',
    }),
    defineField({
      name: 'mentorshipType',
      title: 'Mentorship Type',
      type: 'string',
    }),
    defineField({
      name: 'recommendation',
      title: 'Recommendation',
      type: 'boolean',
    }),
    defineField({
      name: 'recommendationReason',
      title: 'Recommendation Reason',
      type: 'text',
    }),
    defineField({
      name: 'evidenceAvailable',
      title: 'Evidence Available',
      type: 'boolean',
    }),
    defineField({
      name: 'evidenceDescription',
      title: 'Evidence Description',
      type: 'text',
    }),
    defineField({
      name: 'internalEvidenceReference',
      title: 'Internal Evidence Reference',
      type: 'string',
    }),
    defineField({
      name: 'verificationStatus',
      title: 'Verification Status',
      type: 'string',
      options: {
        list: [
          { title: 'Submitted', value: 'submitted' },
          { title: 'Under Review', value: 'under_review' },
          { title: 'Clarification Required', value: 'clarification_required' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
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
          { title: 'Approved', value: 'approved' },
          { title: 'Published', value: 'published' },
          { title: 'Hidden', value: 'hidden' },
          { title: 'Rejected', value: 'rejected' },
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
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Reviewed At',
      type: 'datetime',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'contactPermission',
      title: 'Contact Permission',
      type: 'boolean',
    }),
    defineField({
      name: 'publicationPermission',
      title: 'Publication Permission',
      type: 'boolean',
    }),
  ],
});
