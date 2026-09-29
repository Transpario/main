import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { getAllPublishedPrograms } from '@/lib/sanity/queries';
import { InternshipProgram } from '@/lib/sanity/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://transpario.page';

  // Fetch all published internship programs
  const programs: InternshipProgram[] = await client.fetch(getAllPublishedPrograms).catch(() => []);

  const internshipUrls = (programs || []).map((program) => ({
    url: `${baseUrl}/internships/${program.slug.current}`,
    lastModified: program.lastReviewed ? new Date(program.lastReviewed) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = [
    '',
    '/explore',
    '/how-it-works',
    '/about',
    '/guidelines',
    '/faq',
    '/contact',
    '/review'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...internshipUrls];
}
