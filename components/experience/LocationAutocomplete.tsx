'use client';

import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Loader2, MapPin } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LocationAutocomplete({ label, name, value, onChange, placeholder, error }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(value || '');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal query state if value changes externally (like when form is reset)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    // Click outside to close dropdown
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
       
      setShowDropdown(false);
      return;
    }
    
    // Don't search if the query is already the exactly selected value
    if (query === value) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/locations?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, value]);

  const handleSelect = (loc: string) => {
    setQuery(loc);
    setShowDropdown(false);
    // Mimic standard change event for the parent form
    onChange({
      target: {
        name,
        value: loc,
        type: 'text'
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // We also update the parent so validation can run
    onChange(e);
  };

  return (
    <m.div 
      ref={wrapperRef}
      className="relative"
      animate={error ? "shake" : ""} 
      variants={{ shake: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } } }}
    >
      <label className={`block text-[14px] font-heading font-semibold mb-3 ${error ? 'text-red-400' : 'text-foreground'}`}>{label}</label>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
            if (results.length > 0) setShowDropdown(true);
          }}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          className="w-full bg-transparent pb-3 text-[16px] text-foreground placeholder:text-foreground-muted focus:outline-none font-body border-b border-white/[0.1]"
        />
        
        {isLoading && (
          <div className="absolute right-0 top-0 bottom-3 flex items-center pr-2">
            <Loader2 className="w-4 h-4 text-foreground-subtle animate-spin" />
          </div>
        )}

        <m.div 
          className={`absolute bottom-0 left-0 h-[2px] ${error ? 'bg-red-500' : 'bg-accent'}`}
          initial={false} animate={{ scaleX: isFocused ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ originX: 0 }}
        />
      </div>
      
      <AnimatePresence>
        {showDropdown && results.length > 0 && (
          <m.div 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-surface border border-white/[0.08] rounded-[var(--radius)] shadow-xl overflow-hidden max-h-60 overflow-y-auto"
          >
            {results.map((loc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-4 py-3 text-[15px] text-foreground hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-none flex items-center gap-3 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-foreground-subtle shrink-0" />
                <span className="truncate">{loc}</span>
              </button>
            ))}
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <m.span initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }} className="block text-[13px] text-red-400 mt-2">
            {error}
          </m.span>
        )}
      </AnimatePresence>
    </m.div>
  );
}
