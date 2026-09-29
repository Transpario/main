'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { FilterPanel, FilterState } from './FilterPanel';
import { FilterDrawer } from './FilterDrawer';
import { SortSelect, SortOption } from './SortSelect';
import { InternshipProgram } from '@/lib/sanity/types';
import { ArrowRight, SearchX } from 'lucide-react';
import Link from 'next/link';
import Tag from '../ui/Tag';

interface ExploreClientProps {
  initialPrograms: InternshipProgram[];
  initialFilters: FilterState;
  initialSearch: string;
  initialSort: string;
}

const emptyFilters: FilterState = {
  domain: [],
  mode: [],
  paymentStatus: [],
  certificateStatus: [],
  stipendStatus: [],
  durationCategory: [],
  selectionProcess: [],
};

const formatEnum = (val: string | undefined) => {
  if (!val) return 'Not Disclosed';
  const customMaps: Record<string, string> = {
    under_1_month: 'Under 1 Month',
    one_to_three_months: '1–3 Months',
    three_to_six_months: '3–6 Months',
    six_plus_months: '6+ Months',
    no_fee: 'No Fee',
    payment_required: 'Payment Required',
    optional_payment: 'Optional Payment',
    unclear: 'Unclear',
    free_certificate: 'Free Certificate',
    certificate_available: 'Certificate Available',
    certificate_requires_payment: 'Cert. Requires Payment',
    no_certificate: 'No Certificate',
    stipend_provided: 'Stipend Provided',
    no_stipend: 'No Stipend',
    performance_based: 'Performance Based',
    not_disclosed: 'Not Disclosed',
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'On-site',
  };
  return customMaps[val] || val.replace(/_/g, ' ');
};

const getPaymentColor = (status: string | undefined): 'positive' | 'caution' | 'neutral' => {
  if (status === 'no_fee') return 'positive';
  if (status === 'payment_required') return 'caution';
  return 'neutral';
};

const getStipendColor = (status: string | undefined): 'positive' | 'caution' | 'neutral' => {
  if (status === 'stipend_provided') return 'positive';
  if (status === 'performance_based') return 'caution';
  return 'neutral';
};

export function ExploreClient({ initialPrograms, initialFilters, initialSearch, initialSort }: ExploreClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sort, setSort] = useState<SortOption>(initialSort as SortOption);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const syncToUrl = useCallback((newSearch: string, newSort: string, newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newSearch) {
      params.set('q', newSearch);
    } else {
      params.delete('q');
    }

    if (newSort !== 'recent_review') {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }

    Object.entries(newFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        params.set(key, values.join(','));
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [pathname, router, searchParams]);

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    syncToUrl(searchQuery, newSort, filters);
  };

  const handleFiltersChange = (newFilters: FilterState | ((prev: FilterState) => FilterState)) => {
    const resolvedFilters = typeof newFilters === 'function' ? newFilters(filters) : newFilters;
    setFilters(resolvedFilters);
    syncToUrl(searchQuery, sort, resolvedFilters);
  };

  const handleReset = useCallback(() => {
    setFilters(emptyFilters);
    setSearchQuery('');
    syncToUrl('', 'recent_review', emptyFilters);
  }, [syncToUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== initialSearch) {
        syncToUrl(searchQuery, sort, filters);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, sort, filters, initialSearch, syncToUrl]);

  const activeFilterCount = Object.values(filters).reduce(
    (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
    0
  );

  const hasActiveFiltersOrSearch = activeFilterCount > 0 || searchQuery.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* ─── Filters ─── */}
      <div className="hidden lg:block">
        <FilterPanel 
          filters={filters} 
          setFilters={handleFiltersChange} 
          onReset={handleReset} 
        />
      </div>

      {/* ─── Search + Sort + Mobile Filter ─── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-5 sm:gap-6">
        <div className="flex-1 min-w-0 max-w-md">
          <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">
            Search the Index
          </span>
          <SearchBar 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            onClear={() => setSearchQuery('')}
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="lg:hidden">
            <FilterDrawer 
              filters={filters} 
              setFilters={handleFiltersChange} 
              onReset={handleReset} 
            />
          </div>
          <SortSelect value={sort} onChange={handleSortChange} />
        </div>
      </div>

      {/* ─── Results count ─── */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-muted">
            {initialPrograms.length} {initialPrograms.length === 1 ? 'Opportunity' : 'Opportunities'}
          </span>
          {isPending && (
            <span className="text-[11px] text-accent font-heading font-bold uppercase tracking-wider animate-pulse">
              Updating…
            </span>
          )}
        </div>
        {hasActiveFiltersOrSearch && (
          <button
            onClick={handleReset}
            className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* ─── Index Rows ─── */}
      <div className="transition-opacity duration-150">
        {isPending ? (
          /* Skeleton */
          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="py-7 border-b border-white/[0.04] animate-pulse">
                <div className="flex items-start gap-6">
                  <div className="w-8 h-4 bg-white/[0.04] rounded" />
                  <div className="flex-1 space-y-3">
                    <div className="h-3 bg-white/[0.04] rounded w-32" />
                    <div className="h-5 bg-white/[0.04] rounded w-64" />
                    <div className="h-3 bg-white/[0.04] rounded w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : initialPrograms.length > 0 ? (
          /* Index */
          <div>
            {initialPrograms.map((program, i) => (
              <IndexRow key={program._id} data={program} index={i} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 md:py-28">
            <div className="flex items-center gap-3 mb-6">
              <SearchX className="w-5 h-5 text-foreground-subtle" />
              <h3 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground">
                {hasActiveFiltersOrSearch ? 'Nothing found.' : 'No internships listed yet.'}
              </h3>
            </div>
            {hasActiveFiltersOrSearch ? (
              <div className="space-y-4">
                <p className="text-[15px] text-foreground-muted max-w-md">
                  No internships match the current filters or search.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-[13px] font-heading font-bold uppercase tracking-[0.1em] text-accent hover:text-foreground transition-colors cursor-pointer group"
                >
                  <span>Clear Filters</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <p className="text-[15px] text-foreground-muted max-w-md">
                  We&apos;re building this index with the student community. Know of an internship? Report it and help the next student.
                </p>
                <Link
                  href="/review"
                  className="inline-flex items-center gap-3 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:!text-black hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:translate-y-0 transition-all duration-200 ease-out select-none"
                >
                  <span>Report an Internship</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


/* ─── Inline IndexRow for the Explore page ─── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IndexRow({ data, index }: { data: any; index: number }) {
  const {
    name,
    slug,
    platform,
    role,
    durationCategory,
    paymentStatus,
    certificateStatus,
    stipendStatus,
    mode,
    domain,
    lastReviewed
  } = data;

  const number = String(index + 1).padStart(2, '0');

  const formattedDate = lastReviewed
    ? new Date(lastReviewed).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : null;

  // Pick the first domain as the field
  const field = Array.isArray(domain) && domain.length > 0 ? domain[0] : null;

  return (
    <Link
      href={slug?.current ? `/internships/${slug.current}` : '#'}
      className="group block border-b border-white/[0.05] last:border-b-0"
    >
      <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-start gap-3 md:gap-0 transition-all duration-300 ease-out group-hover:bg-white/[0.012] -mx-4 px-4 md:-mx-6 md:px-6">
        {/* Number */}
        <div className="w-14 shrink-0 pt-0.5">
          <span className="text-[12px] font-heading font-bold tracking-[0.1em] text-foreground-subtle">{number}</span>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Platform */}
          <span className="text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle block mb-1">
            {platform?.name || 'Unknown Platform'}
          </span>

          {/* Program name */}
          <h3 className="text-[20px] md:text-[24px] lg:text-[26px] font-heading font-bold text-foreground leading-tight mb-1.5 group-hover:text-white transition-colors duration-200">
            {name}
          </h3>

          {/* Role */}
          {role && (
            <p className="text-[14px] text-foreground-muted mb-3">
              {role}
            </p>
          )}

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-foreground-subtle mb-4">
            {field && <span>{field}</span>}
            {field && <span className="text-white/15">·</span>}
            <span>{formatEnum(mode)}</span>
            <span className="text-white/15">·</span>
            <span>{formatEnum(durationCategory)}</span>
            {formattedDate && (
              <>
                <span className="text-white/15">·</span>
                <span>Reviewed {formattedDate}</span>
              </>
            )}
          </div>

          {/* Transparency signals */}
          <div className="flex flex-wrap items-center gap-2">
            <Tag color={getPaymentColor(paymentStatus)}>
              {formatEnum(paymentStatus)?.toUpperCase()}
            </Tag>
            {stipendStatus && stipendStatus !== 'not_disclosed' && (
              <Tag color={getStipendColor(stipendStatus)}>
                {formatEnum(stipendStatus)?.toUpperCase()}
              </Tag>
            )}
            {certificateStatus && certificateStatus !== 'not_disclosed' && (
              <Tag color="neutral">
                {formatEnum(certificateStatus)?.toUpperCase()}
              </Tag>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0 md:ml-8 md:mt-6 self-end md:self-start">
          <ArrowRight className="w-5 h-5 text-foreground-subtle group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
}
