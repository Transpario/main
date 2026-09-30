import React, { useState } from 'react';
import { FilterState } from './FilterPanel';
import { SlidersHorizontal, X, Check } from 'lucide-react';

interface FilterDrawerProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>> | ((updater: FilterState | ((prev: FilterState) => FilterState)) => void);
  onReset: () => void;
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

const categories: (keyof FilterState)[] = [
  'domain', 'mode', 'paymentStatus', 'certificateStatus',
  'stipendStatus', 'durationCategory', 'selectionProcess',
];

export function FilterDrawer({ filters, setFilters, onReset }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalActiveCount = Object.values(filters).reduce(
    (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
    0
  );

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

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-foreground-muted border border-white/[0.08] rounded-[var(--radius)] px-3 py-2 hover:text-foreground hover:border-white/15 transition-all cursor-pointer"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filters</span>
        {totalActiveCount > 0 && (
          <span className="text-[10px] font-mono font-bold text-accent">{totalActiveCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-full max-w-sm h-full bg-background border-l border-white/[0.06] flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <h3 className="text-[14px] font-heading font-bold uppercase tracking-[0.1em] text-foreground">
                  Filters
                </h3>
                {totalActiveCount > 0 && (
                  <span className="text-[11px] font-mono font-bold text-accent">{totalActiveCount}</span>
                )}
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter groups */}
            <div className="flex-1 overflow-y-auto" data-lenis-prevent="true">
              {categories.map(cat => {
                const options = FILTER_OPTIONS[cat];
                const activeInGroup = (filters[cat] || []).length;
                return (
                  <div key={cat} className="border-b border-white/[0.04]">
                    <div className="px-5 pt-5 pb-2 flex items-center gap-2">
                      <h4 className="text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle">
                        {GROUP_TITLES[cat]}
                      </h4>
                      {activeInGroup > 0 && (
                        <span className="text-[10px] font-mono font-bold text-accent">{activeInGroup}</span>
                      )}
                    </div>
                    <div className="px-5 pb-4 space-y-0.5">
                      {options.map(opt => {
                        const isSelected = (filters[cat] || []).includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleToggle(cat, opt.value)}
                            className={`w-full text-left px-3 py-2.5 text-[13px] rounded-[var(--radius)] transition-colors cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'text-foreground bg-white/[0.04]'
                                : 'text-foreground-muted hover:text-foreground hover:bg-white/[0.02]'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3">
              {totalActiveCount > 0 && (
                <button
                  type="button"
                  onClick={onReset}
                  className="flex-1 h-[40px] text-[12px] font-heading font-bold uppercase tracking-[0.08em] text-foreground-muted border border-white/[0.1] rounded-[var(--radius)] hover:text-foreground hover:border-white/20 transition-all cursor-pointer"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 h-[40px] text-[12px] font-heading font-bold uppercase tracking-[0.08em] bg-white !text-black rounded-[var(--radius)] hover:bg-white/90 transition-all cursor-pointer"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
