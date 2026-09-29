'use client';

import React from 'react';
import Link from 'next/link';
import Tag from '../ui/Tag';
import { ArrowRight } from 'lucide-react';

interface IndexRowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  index: number;
}

export default function IndexRow({ data, index }: IndexRowProps) {
  const {
    name,
    slug,
    platform,
    role,
    durationCategory,
    paymentStatus,
    mode,
    certificateStatus,
    stipendStatus,
    lastReviewed
  } = data;

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

  const formattedDate = lastReviewed
    ? new Date(lastReviewed).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : null;

  const number = String(index + 1).padStart(2, '0');

  return (
    <Link
      href={slug?.current ? `/internships/${slug.current}` : '#'}
      className="group block border-b border-white/[0.06] last:border-b-0"
    >
      <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-0 transition-all duration-300 ease-out group-hover:bg-white/[0.015]">
        {/* Number */}
        <div className="w-16 shrink-0">
          <span className="text-index-number">{number}</span>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Platform name */}
          <span className="text-[11px] md:text-[12px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle block mb-1.5">
            {platform?.name || 'Unknown Platform'}
          </span>

          {/* Program name — the dominant text */}
          <h3 className="text-[20px] md:text-[24px] font-heading font-bold text-foreground leading-tight mb-1 group-hover:text-white transition-colors duration-200">
            {name}
          </h3>

          {/* Role */}
          {role && (
            <p className="text-[14px] text-foreground-muted mb-3">
              {role}
            </p>
          )}

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-foreground-subtle">
            <span>{formatEnum(mode)}</span>
            <span className="text-white/20">·</span>
            <span>{formatEnum(durationCategory)}</span>
            {formattedDate && (
              <>
                <span className="text-white/20">·</span>
                <span>Reviewed {formattedDate}</span>
              </>
            )}
          </div>
        </div>

        {/* Right side: payment badge + arrow */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0 md:ml-8 md:mt-4">
          <Tag color={getPaymentColor(paymentStatus)}>
            {formatEnum(paymentStatus)?.toUpperCase()}
          </Tag>
          <ArrowRight className="w-5 h-5 text-foreground-subtle group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
}
