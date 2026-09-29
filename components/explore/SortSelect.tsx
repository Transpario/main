import React from 'react';

export type SortOption = 'recent_review' | 'recent_added' | 'alphabetical';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  recent_review: 'Recently Reviewed',
  recent_added: 'Recently Added',
  alphabetical: 'Alphabetical',
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  const options: SortOption[] = ['recent_review', 'recent_added', 'alphabetical'];

  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle whitespace-nowrap">
        Sort
      </span>
      <div className="flex items-center gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`text-[11px] font-heading font-semibold uppercase tracking-[0.08em] px-2.5 py-1 transition-colors cursor-pointer whitespace-nowrap ${
              value === opt
                ? 'text-foreground'
                : 'text-foreground-subtle hover:text-foreground-muted'
            }`}
          >
            {SORT_LABELS[opt]}
          </button>
        ))}
      </div>
    </div>
  );
}
