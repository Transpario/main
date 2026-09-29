import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

export interface FilterState {
  domain: string[];
  mode: string[];
  paymentStatus: string[];
  certificateStatus: string[];
  stipendStatus: string[];
  durationCategory: string[];
  selectionProcess: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>> | ((updater: FilterState | ((prev: FilterState) => FilterState)) => void);
  onReset: () => void;
  className?: string;
}

const FILTER_OPTIONS: { [K in keyof FilterState]: { label: string; value: string }[] } = {
  domain: [
    { label: 'Software Development', value: 'Software Development' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
    { label: 'AI / Machine Learning', value: 'Artificial Intelligence / Machine Learning' },
    { label: 'Data Science', value: 'Data Science' },
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Mobile Development', value: 'Mobile Development' },
    { label: 'Design', value: 'Design' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Other', value: 'Other' },
  ],
  mode: [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'On-site', value: 'onsite' },
    { label: 'Not Disclosed', value: 'not_disclosed' },
  ],
  paymentStatus: [
    { label: 'No Fee', value: 'no_fee' },
    { label: 'Payment Required', value: 'payment_required' },
    { label: 'Optional Payment', value: 'optional_payment' },
    { label: 'Unclear', value: 'unclear' },
  ],
  certificateStatus: [
    { label: 'Free Certificate', value: 'free_certificate' },
    { label: 'Certificate Available', value: 'certificate_available' },
    { label: 'Requires Payment', value: 'certificate_requires_payment' },
    { label: 'No Certificate', value: 'no_certificate' },
    { label: 'Not Disclosed', value: 'not_disclosed' },
  ],
  stipendStatus: [
    { label: 'Stipend Provided', value: 'stipend_provided' },
    { label: 'No Stipend', value: 'no_stipend' },
    { label: 'Performance Based', value: 'performance_based' },
    { label: 'Not Disclosed', value: 'not_disclosed' },
  ],
  durationCategory: [
    { label: 'Under 1 Month', value: 'under_1_month' },
    { label: '1–3 Months', value: 'one_to_three_months' },
    { label: '3–6 Months', value: 'three_to_six_months' },
    { label: '6+ Months', value: 'six_plus_months' },
    { label: 'Not Disclosed', value: 'not_disclosed' },
  ],
  selectionProcess: [
    { label: 'Direct Enrollment', value: 'direct_enrollment' },
    { label: 'Application', value: 'application' },
    { label: 'Resume Screening', value: 'resume_screening' },
    { label: 'Aptitude Test', value: 'aptitude_test' },
    { label: 'Technical Test', value: 'technical_test' },
    { label: 'Interview', value: 'interview' },
    { label: 'Not Disclosed', value: 'not_disclosed' },
  ],
};

const GROUP_TITLES: Record<keyof FilterState, string> = {
  domain: 'Field',
  mode: 'Mode',
  paymentStatus: 'Payment',
  certificateStatus: 'Certificate',
  stipendStatus: 'Stipend',
  durationCategory: 'Duration',
  selectionProcess: 'Selection',
};

function FilterDropdown({
  category,
  title,
  options,
  selectedValues,
  onToggle,
}: {
  category: keyof FilterState;
  title: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onToggle: (category: keyof FilterState, value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const activeCount = selectedValues.length;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 text-[12px] font-heading font-semibold uppercase tracking-[0.08em] py-2 px-3 border transition-all cursor-pointer whitespace-nowrap rounded-[var(--radius)] select-none ${
          activeCount > 0
            ? 'text-accent border-accent/30 bg-accent/[0.06]'
            : isOpen
              ? 'text-foreground border-white/20 bg-white/[0.03]'
              : 'text-foreground-muted border-white/[0.08] hover:text-foreground hover:border-white/15'
        }`}
      >
        <span>{title}</span>
        {activeCount > 0 && (
          <span className="text-[10px] font-mono font-bold text-accent">{activeCount}</span>
        )}
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 min-w-[200px] bg-surface border border-white/[0.1] rounded-[var(--radius)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2">
          {options.map((opt) => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onToggle(category, opt.value)}
                className={`w-full text-left px-4 py-2 text-[13px] transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'text-foreground bg-white/[0.04]'
                    : 'text-foreground-muted hover:text-foreground hover:bg-white/[0.03]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FilterPanel({ filters, setFilters, onReset, className = '' }: FilterPanelProps) {
  const handleToggle = (category: keyof FilterState, value: string) => {
    const updateFn = (prev: FilterState): FilterState => {
      const currentValues = prev[category] || [];
      const updated = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: updated };
    };

    if (typeof setFilters === 'function') {
      (setFilters as (updater: (prev: FilterState) => FilterState) => void)(updateFn);
    }
  };

  const totalActiveCount = Object.values(filters).reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0);

  const categories: (keyof FilterState)[] = [
    'domain',
    'mode',
    'paymentStatus',
    'certificateStatus',
    'stipendStatus',
    'durationCategory',
    'selectionProcess',
  ];

  // Collect active filter labels for display
  const activeFilters: { category: keyof FilterState; value: string; label: string }[] = [];
  categories.forEach(cat => {
    const options = FILTER_OPTIONS[cat];
    (filters[cat] || []).forEach(val => {
      const opt = options.find(o => o.value === val);
      if (opt) {
        activeFilters.push({ category: cat, value: val, label: opt.label });
      }
    });
  });

  return (
    <div className={className}>
      {/* Filter dropdowns row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mr-1">
          Explore by
        </span>
        {categories.map(cat => (
          <FilterDropdown
            key={cat}
            category={cat}
            title={GROUP_TITLES[cat]}
            options={FILTER_OPTIONS[cat]}
            selectedValues={filters[cat] || []}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Active filter tags */}
      {totalActiveCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {activeFilters.map((af) => (
            <button
              key={`${af.category}-${af.value}`}
              type="button"
              onClick={() => handleToggle(af.category, af.value)}
              className="inline-flex items-center gap-1.5 text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-foreground-muted bg-white/[0.04] border border-white/[0.08] rounded-[var(--radius)] px-2.5 py-1 hover:border-white/20 hover:text-foreground transition-all cursor-pointer group"
            >
              <span>{af.label}</span>
              <X className="w-3 h-3 text-foreground-subtle group-hover:text-foreground transition-colors" />
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-foreground-subtle hover:text-foreground transition-colors cursor-pointer ml-1"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
