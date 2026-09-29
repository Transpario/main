import React, { ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onClear, placeholder = "Company, role, field..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none text-foreground-subtle">
        <Search className="w-4 h-4" />
      </div>
      <input 
        type="search" 
        className="block w-full h-[40px] pl-7 pr-8 text-[14px] bg-transparent border-b border-white/[0.1] hover:border-white/20 placeholder-foreground-subtle text-foreground font-body focus:outline-none focus:border-accent/60 transition-all" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            if (onClear) onClear();
            else {
              const dummyEvent = { target: { value: '' } } as ChangeEvent<HTMLInputElement>;
              onChange(dummyEvent);
            }
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-0 text-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
