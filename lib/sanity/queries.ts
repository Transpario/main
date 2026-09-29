import { groq } from 'next-sanity';

// Select only card fields for listings
export const getAllPublishedPrograms = groq`
  *[_type == "internshipProgram" && publicationStatus == 'published' && founderApproved == true] {
    _id,
    name,
    slug,
    "platform": platform->{
      _id,
      name,
      slug,
      logo
    },
    role,
    durationCategory,
    paymentStatus,
    certificateStatus,
    stipendStatus,
    mode,
    domain,
    selectionProcess,
    verificationStatus,
    lastReviewed,
    _createdAt
  }
`;

export function buildFilteredProgramsQuery(filters: Record<string, string[]>, search: string, sort: string) {
  let queryStr = `*[_type == "internshipProgram" && publicationStatus == 'published' && founderApproved == true`;
  const params: Record<string, string | string[]> = {};

  if (search) {
    queryStr += ` && (name match $search || platform->name match $search || role match $search)`;
    params.search = `*${search}*`;
  }

  // Handle array filters like domain, mode, etc.
  const arrayFields = ['domain', 'selectionProcess', 'workType'];
  const stringFields = ['mode', 'paymentStatus', 'certificateStatus', 'stipendStatus', 'durationCategory'];

  Object.entries(filters).forEach(([key, values]) => {
    if (values.length > 0) {
      if (arrayFields.includes(key)) {
        // For array fields, we want to match if ANY of the values exist in the program's array
        // We can do count((domain[])[@ in $domains]) > 0
        queryStr += ` && count((${key}[])[@ in $${key}]) > 0`;
        params[key] = values;
      } else if (stringFields.includes(key)) {
        // For string fields, we want to match if the program's value is IN the selected values
        queryStr += ` && ${key} in $${key}`;
        params[key] = values;
      }
    }
  });

  queryStr += `]`;

  if (sort === 'recent_added') {
    queryStr += ` | order(_createdAt desc)`;
  } else if (sort === 'alphabetical') {
    queryStr += ` | order(name asc)`;
  } else {
    // Default: recent_review
    queryStr += ` | order(lastReviewed desc)`;
  }

  queryStr += ` {
    _id,
    name,
    slug,
    "platform": platform->{
      _id,
      name,
      slug,
      logo
    },
    role,
    durationCategory,
    paymentStatus,
    certificateStatus,
    stipendStatus,
    mode,
    domain,
    selectionProcess,
    verificationStatus,
    lastReviewed,
    _createdAt
  }`;

  return { query: queryStr, params };
}


// Full detail with platform and published reviews
export const getProgramBySlug = groq`
  *[_type == "internshipProgram" && slug.current == $slug && publicationStatus == 'published' && founderApproved == true][0] {
    _id,
    name,
    slug,
    "platform": platform->{
      _id,
      name,
      slug,
      logo,
      website,
      description
    },
    role,
    description,
    domain,
    mode,
    duration,
    durationCategory,
    paymentStatus,
    paymentAmount,
    paymentCurrency,
    paymentReason,
    paymentMandatory,
    paymentDetails,
    certificateStatus,
    certificateCost,
    certificateDetails,
    stipendStatus,
    stipendAmount,
    stipendFrequency,
    stipendDetails,
    selectionProcess,
    selectionDetails,
    workType,
    workDescription,
    technologies,
    mentorship,
    mentorshipDetails,
    verificationStatus,
    lastReviewed,
    "studentReviews": *[_type == "studentReview" && internship._ref == ^._id && publicationStatus == 'published' && founderApproved == true] {
      _id,
      displayName,
      anonymous,
      experience,
      keyTakeaway,
      unexpected,
      selected,
      completed,
      experienceMatchedExpectations,
      paymentExperience,
      paymentAmount,
      paymentRequired,
      certificateExperience,
      certificateProvided,
      certificateWasFree,
      stipendExperience,
      stipendProvided,
      stipendAmount,
      selectionExperience,
      interviewConducted,
      interviewType,
      projectExperience,
      workTypes,
      mentorshipExperience,
      mentorshipType,
      recommendation,
      recommendationReason,
      evidenceAvailable,
      evidenceDescription,
      publishedAt
    }
  }
`;

// Limit 6, ordered by lastReviewed desc
export const getRecentlyReviewed = groq`
  *[_type == "internshipProgram" && publicationStatus == 'published' && founderApproved == true] | order(lastReviewed desc)[0...6] {
    _id,
    name,
    slug,
    "platform": platform->{
      _id,
      name,
      slug,
      logo
    },
    role,
    durationCategory,
    paymentStatus,
    certificateStatus,
    stipendStatus,
    mode,
    verificationStatus,
    lastReviewed
  }
`;

export const getSiteSettings = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    logo,
    favicon,
    contactEmail,
    googleFormUrl,
    socialLinks,
    footerContent
  }
`;

// Ordered by order asc
export const getPublishedFAQs = groq`
  *[_type == "faq" && published == true] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const getPageBySlug = groq`
  *[_type == "page" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    seoTitle,
    seoDescription
  }
`;

export const getAllPublishedReviews = groq`
  *[_type == "studentReview" && publicationStatus == 'published' && founderApproved == true] | order(publishedAt desc, submittedAt desc) {
    _id,
    displayName,
    anonymous,
    experience,
    keyTakeaway,
    unexpected,
    paymentExperience,
    certificateExperience,
    stipendExperience,
    projectExperience,
    publishedAt,
    "internship": internship->{
      name,
      slug,
      role,
      "platform": platform->{
        name
      }
    }
  }
`;

export const getReviewById = groq`
  *[_type == "studentReview" && _id == $id && publicationStatus == 'published' && founderApproved == true][0] {
    _id,
    displayName,
    anonymous,
    experience,
    keyTakeaway,
    unexpected,
    paymentExperience,
    certificateExperience,
    stipendExperience,
    projectExperience,
    mentorshipExperience,
    selectionExperience,
    publishedAt,
    "internship": internship->{
      name,
      slug,
      role,
      "platform": platform->{
        name
      }
    }
  }
`;
