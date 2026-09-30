'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { useReducedMotion } from '@/lib/motion';

interface QuestionRowProps {
  question: string;
  description: string;
  href: string;
  index: number;
}

export default function QuestionRow({ question, description, href, index }: QuestionRowProps) {
  const isReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <Link
        href={href}
        className="group block border-b border-white/[0.08] last:border-b-0"
      >
        <m.div 
          className="py-5 md:py-7 flex items-start md:items-center justify-between gap-4 md:gap-8"
          whileHover={isReducedMotion ? {} : { x: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-question text-foreground group-hover:text-accent transition-colors duration-300">
              {question}
            </h3>
            <p className="text-[13px] md:text-[14px] text-foreground-subtle mt-1 max-h-0 overflow-hidden opacity-0 group-hover:max-h-[60px] group-hover:opacity-100 transition-all duration-300 ease-out leading-relaxed">
              {description}
            </p>
          </div>
          <div className="shrink-0 mt-1 md:mt-0">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-foreground-subtle group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-300" />
          </div>
        </m.div>
      </Link>
    </LazyMotion>
  );
}
