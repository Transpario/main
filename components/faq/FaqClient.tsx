'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, X, HelpCircle, FilterX } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqClientProps {
  faqs: FAQItem[];
}

// Categorization helper for items without explicit category from Sanity
function getCategoryForFaq(faq: FAQItem): string {
  if (faq.category) return faq.category;
  
  const q = faq.question.toLowerCase();
  if (q.includes('payment') || q.includes('disclosed') || q.includes('verified')) {
    return 'Classifications & Evidence';
  }
  if (q.includes('submit') || q.includes('published') || q.includes('anonymously')) {
    return 'Submitting Experiences';
  }
  return 'About the Platform';
}

export default function FaqClient({ faqs }: FaqClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // Track open accordion IDs (default first item open)
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (faqs.length > 0) initial.add(faqs[0]._id);
    return initial;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Group FAQs by category
  const categorizedFaqs = useMemo(() => {
    const map = new Map<string, FAQItem[]>();

    faqs.forEach((faq) => {
      const cat = getCategoryForFaq(faq);
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push(faq);
    });

    return map;
  }, [faqs]);

  const categories = useMemo(() => {
    return ['ALL', ...Array.from(categorizedFaqs.keys())];
  }, [categorizedFaqs]);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return faqs.filter((faq) => {
      const cat = getCategoryForFaq(faq);
      const matchesCategory = selectedCategory === 'ALL' || cat === selectedCategory;

      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [faqs, searchQuery, selectedCategory]);

  // Group filtered FAQs by category for rendering section headers
  const filteredGroupedFaqs = useMemo(() => {
    const map = new Map<string, FAQItem[]>();

    filteredFaqs.forEach((faq) => {
      const cat = getCategoryForFaq(faq);
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push(faq);
    });

    return map;
  }, [filteredFaqs]);

  const totalCount = filteredFaqs.length;

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-foreground-subtle">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="block w-full h-12 pl-12 pr-10 text-sm bg-surface border border-border rounded-[var(--radius)] placeholder-foreground-subtle text-foreground font-body focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent focus-visible:ring-2 focus-visible:ring-accent transition-all"
            placeholder="Search FAQs by question or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-foreground-subtle hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider rounded-[var(--radius)] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-accent text-white shadow-[0_0_12px_rgba(37,99,235,0.3)]'
                    : 'bg-surface border border-border text-foreground-muted hover:text-foreground hover:border-border-strong'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      {(searchQuery || selectedCategory !== 'ALL') && (
        <div className="flex items-center justify-between pb-3 border-b border-border text-sm">
          <span className="text-foreground-muted font-heading uppercase tracking-wider text-xs">
            Showing <strong className="text-foreground">{totalCount}</strong> {totalCount === 1 ? 'question' : 'questions'}
          </span>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-heading font-semibold uppercase tracking-wider"
          >
            <FilterX className="w-3.5 h-3.5" />
            Reset Filter
          </button>
        </div>
      )}

      {/* FAQs Accordion Group List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-10">
          {Array.from(filteredGroupedFaqs.entries()).map(([category, categoryFaqs]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/80">
                <HelpCircle className="w-4 h-4 text-accent" />
                <h2 className="text-xs font-bold font-heading uppercase tracking-wider text-accent">
                  {category}
                </h2>
              </div>

              <div className="space-y-3">
                {categoryFaqs.map((faq) => {
                  const isOpen = openIds.has(faq._id);
                  return (
                    <div
                      key={faq._id}
                      className="border border-border bg-surface rounded-[var(--radius)] overflow-hidden transition-colors hover:border-border-strong"
                    >
                      <button
                        onClick={() => toggleAccordion(faq._id)}
                        className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-t-[var(--radius)]"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-base sm:text-lg font-bold font-heading uppercase tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                          {faq.question}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-surface-hover border border-border flex items-center justify-center shrink-0 group-hover:border-accent/60 transition-colors">
                          <ChevronDown
                            className={`w-4 h-4 text-foreground-subtle group-hover:text-accent transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-accent' : 'rotate-0'
                            }`}
                          />
                        </div>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5 pt-2 border-t border-border/40 text-body text-foreground-muted leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="text-center py-16 px-6 bg-surface border border-dashed border-border flex flex-col items-center">
          <HelpCircle className="w-10 h-10 text-foreground-subtle mb-4" />
          <h3 className="text-xl font-bold font-heading uppercase text-foreground mb-2">
            NO MATCHING QUESTIONS FOUND
          </h3>
          <p className="text-body text-foreground-muted mb-6 max-w-md">
            We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;. Try another search or explore our guidelines.
          </p>
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
            >
              CLEAR SEARCH
            </Button>
            <Button variant="secondary" href="/contact">
              CONTACT US
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
