import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'internshipPlatform',
  title: 'Internship Platform',
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
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastReviewed',
      title: 'Last Reviewed',
      type: 'datetime',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
