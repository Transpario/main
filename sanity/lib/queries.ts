import { groq } from 'next-sanity';

export const getAllPublishedProgramsQuery = groq`
  *[_type == "internshipProgram" && publicationStatus == "published"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    role,
    "platform": platform->{
      name,
      slug,
      logo
    },
    domain,
    mode,
    duration,
    durationCategory,
    paymentStatus,
    certificateStatus,
    stipendStatus,
    selectionProcess,
    lastReviewed,
    _createdAt
  }
`;
