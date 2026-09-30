import React from 'react';
import { ExploreClient } from '@/components/explore/ExploreClient';
import { sanityFetch } from '@/lib/sanity/client';
import { buildFilteredProgramsQuery } from '@/lib/sanity/queries';
import { InternshipProgram } from '@/lib/sanity/types';
import { FilterState } from '@/components/explore/FilterPanel';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'The Index - Transpario',
  description: 'Internship opportunities, organized by the information students usually want to know.',
};

export default async function ExplorePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;

  // Extract search and sort
  const q = typeof params.q === 'string' ? params.q : '';
  const sort = typeof params.sort === 'string' ? params.sort : 'recent_review';

  // Extract filters
  const filterKeys = ['domain', 'mode', 'paymentStatus', 'certificateStatus', 'stipendStatus', 'durationCategory', 'selectionProcess'];
  const filters: Record<string, string[]> = {};
  
  filterKeys.forEach(key => {
    const val = params[key];
    if (typeof val === 'string') {
      filters[key] = val.split(',');
    } else if (Array.isArray(val)) {
      filters[key] = val.flatMap(v => v.split(','));
    } else {
      filters[key] = [];
    }
  });

  const { query, params: queryParams } = buildFilteredProgramsQuery(filters, q, sort);
  const programs = await sanityFetch<InternshipProgram[]>({ query, params: queryParams }) || [];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
      {/* Editorial page header */}
      <div className="pt-12 md:pt-20 pb-10 md:pb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-section-heading text-foreground mb-4">
            The Index
          </h1>
          <p className="text-[15px] md:text-[16px] text-foreground-muted max-w-xl leading-relaxed">
            Internship programs, organized by the information students usually have to discover later.
          </p>
        </div>
        <Link
          href="/review"
          className="inline-flex items-center gap-2 h-[40px] px-5 bg-white !text-black font-heading font-bold text-[12px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:translate-y-0 transition-all duration-200 ease-out select-none shrink-0 group"
        >
          <span>Share My Experience</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <ExploreClient 
        initialPrograms={programs} 
        initialFilters={filters as unknown as FilterState} 
        initialSearch={q} 
        initialSort={sort} 
      />

      {/* Bottom padding */}
      <div className="pb-16 md:pb-24" />
    </div>
  );
}
