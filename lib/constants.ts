export const CONTACT_CATEGORIES = [
  'General Inquiry',
  'Correction / Update',
  'Partnership',
  'Contributor Inquiry',
  'Other',
] as const;

export type ContactCategory = typeof CONTACT_CATEGORIES[number];
