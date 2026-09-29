import type { PortableTextBlock } from '@portabletext/types';
import type { Image, Reference, Slug } from 'sanity';

export interface InternshipPlatform {
  _id: string;
  _type: 'internshipPlatform';
  name: string;
  slug: Slug;
  logo?: Image;
  website?: string;
  description?: PortableTextBlock[];
  domain?: string[];
  status: 'active' | 'inactive';
  lastReviewed?: string;
  published: boolean;
}

export interface InternshipProgram {
  _id: string;
  _type: 'internshipProgram';
  name: string;
  slug: Slug;
  platform: Reference | InternshipPlatform;
  role?: string;
  description?: PortableTextBlock[];
  domain?: string[];
  mode?: 'remote' | 'hybrid' | 'onsite' | 'not_disclosed';
  duration?: string;
  durationCategory?: 'under_1_month' | 'one_to_three_months' | 'three_to_six_months' | 'six_plus_months' | 'not_disclosed';
  paymentStatus?: 'no_fee' | 'payment_required' | 'optional_payment' | 'unclear';
  paymentAmount?: string;
  paymentCurrency?: string;
  paymentReason?: string;
  paymentMandatory?: boolean;
  paymentDetails?: string;
  certificateStatus?: 'free_certificate' | 'certificate_available' | 'certificate_requires_payment' | 'no_certificate' | 'not_disclosed';
  certificateCost?: string;
  certificateDetails?: string;
  stipendStatus?: 'stipend_provided' | 'no_stipend' | 'performance_based' | 'not_disclosed';
  stipendAmount?: string;
  stipendFrequency?: string;
  stipendDetails?: string;
  selectionProcess?: ('direct_enrollment' | 'application' | 'resume_screening' | 'aptitude_test' | 'technical_test' | 'assignment' | 'interview' | 'hr_interview' | 'other' | 'not_disclosed')[];
  selectionDetails?: string;
  workType?: ('project_based' | 'real_company_project' | 'internal_project' | 'assignment_based' | 'training_based' | 'research_based' | 'other' | 'not_disclosed')[];
  workDescription?: string;
  technologies?: string[];
  mentorship?: 'dedicated_mentor' | 'group_mentorship' | 'periodic_mentorship' | 'no_mentorship' | 'not_disclosed';
  mentorshipDetails?: string;
  studentReviews?: Reference[] | StudentReview[];
  verificationStatus: 'not_reviewed' | 'under_review' | 'reviewed' | 'verified' | 'needs_update';
  publicationStatus: 'draft' | 'under_review' | 'approved' | 'published' | 'archived';
  founderApproved: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
  lastReviewed?: string;
  sourceNotes?: string;
  sourceUrls?: string[];
}

export interface StudentReview {
  _id: string;
  _type: 'studentReview';
  internship: Reference | InternshipProgram;
  displayName: string;
  anonymous: boolean;
  experience?: PortableTextBlock[];
  keyTakeaway?: string;
  unexpected?: string;
  selected?: boolean;
  completed?: boolean;
  experienceMatchedExpectations?: number; // scale
  paymentExperience?: string;
  paymentAmount?: string;
  paymentRequired?: boolean;
  certificateExperience?: string;
  certificateProvided?: boolean;
  certificateWasFree?: boolean;
  stipendExperience?: string;
  stipendProvided?: boolean;
  stipendAmount?: string;
  selectionExperience?: string[];
  interviewConducted?: boolean;
  interviewType?: string[];
  projectExperience?: string;
  workTypes?: string[];
  mentorshipExperience?: string;
  mentorshipType?: string;
  recommendation?: boolean;
  recommendationReason?: string;
  evidenceAvailable?: boolean;
  evidenceDescription?: string;
  internalEvidenceReference?: string;
  verificationStatus: 'submitted' | 'under_review' | 'clarification_required' | 'reviewed' | 'approved' | 'rejected';
  publicationStatus: 'draft' | 'approved' | 'published' | 'hidden' | 'rejected';
  founderApproved: boolean;
  submittedAt?: string;
  reviewedAt?: string;
  publishedAt?: string;
  contactPermission?: boolean;
  publicationPermission?: boolean;
}

export interface FAQ {
  _id: string;
  _type: 'faq';
  question: string;
  answer: PortableTextBlock[];
  category?: string;
  order?: number;
  published: boolean;
}

export interface Page {
  _id: string;
  _type: 'page';
  title: string;
  slug: Slug;
  content: PortableTextBlock[];
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  siteName: string;
  tagline?: string;
  logo?: Image;
  favicon?: Image;
  contactEmail?: string;
  googleFormUrl?: string;
  socialLinks?: { platform: string; url: string }[];
  footerContent?: PortableTextBlock[];
}
