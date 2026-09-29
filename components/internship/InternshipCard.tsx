import React from 'react';
import Link from 'next/link';
import Tag from '../ui/Tag';
import { Building2, ArrowRight } from 'lucide-react';

interface InternshipCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function InternshipCard({ data }: InternshipCardProps) {
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
    lastReviewed
  } = data;

  const formatEnum = (val: string | undefined) => {
    if (!val) return 'NOT DISCLOSED';
    const customMaps: Record<string, string> = {
      under_1_month: 'UNDER 1 MONTH',
      one_to_three_months: '1–3 MONTHS',
      three_to_six_months: '3–6 MONTHS',
      six_plus_months: '6+ MONTHS',
      no_fee: 'NO FEE',
      payment_required: 'PAYMENT REQUIRED',
      optional_payment: 'OPTIONAL PAYMENT',
      unclear: 'UNCLEAR',
      free_certificate: 'FREE CERTIFICATE',
      certificate_available: 'CERTIFICATE AVAILABLE',
      certificate_requires_payment: 'CERTIFICATE REQUIRES PAYMENT',
      no_certificate: 'NO CERTIFICATE',
      stipend_provided: 'STIPEND PROVIDED',
      no_stipend: 'NO STIPEND',
      performance_based: 'PERFORMANCE BASED',
      not_disclosed: 'NOT DISCLOSED',
      remote: 'REMOTE',
      hybrid: 'HYBRID',
      onsite: 'ON-SITE',
    };
    return customMaps[val] || val.replace(/_/g, ' ').toUpperCase();
  };

  const getPaymentColor = (status: string | undefined): 'positive' | 'caution' | 'neutral' => {
    if (status === 'no_fee') return 'positive';
    if (status === 'payment_required') return 'caution';
    return 'neutral';
  };

  const getCertificateColor = (status: string | undefined): 'positive' | 'caution' | 'neutral' => {
    if (status === 'free_certificate') return 'positive';
    if (status === 'certificate_requires_payment') return 'caution';
    return 'neutral';
  };

  const getStipendColor = (status: string | undefined): 'positive' | 'caution' | 'neutral' => {
    if (status === 'stipend_provided') return 'positive';
    if (status === 'performance_based') return 'caution';
    return 'neutral';
  };

  const formattedDate = lastReviewed 
    ? new Date(lastReviewed).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).toUpperCase()
    : 'N/A';

  return (
    <div className="bg-surface border border-white/[0.1] hover:border-white/25 rounded-[var(--radius)] p-6 sm:p-7 flex flex-col justify-between h-full group hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out select-none">
      <div>
        {/* Company Row (Secondary visually) */}
        <div className="flex items-center gap-3 mb-3.5">
          <div className="w-8 h-8 rounded-[var(--radius)] bg-surface-hover border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
            <Building2 className="w-4 h-4 text-foreground-subtle group-hover:text-accent transition-colors" />
          </div>
          <span className="text-[11.5px] font-heading font-bold uppercase tracking-widest text-foreground-muted line-clamp-1">
            {platform?.name || 'Unknown Platform'}
          </span>
        </div>
        
        {/* Internship Title (Strongest visual text inside card) */}
        <h3 className="text-[17px] sm:text-[18px] font-bold font-heading mb-1 text-foreground group-hover:text-white transition-colors leading-snug">
          {name}
        </h3>
        
        {/* Role Subtitle (Muted text) */}
        <p className="text-[13.5px] text-foreground-subtle mb-4">
          {role || 'Internship Program'}
        </p>

        {/* Semantic Badges Row */}
        <div className="flex flex-wrap gap-2 mb-5">
          <Tag color={getPaymentColor(paymentStatus)}>{formatEnum(paymentStatus)}</Tag>
          <Tag color={getCertificateColor(certificateStatus)}>{formatEnum(certificateStatus)}</Tag>
          <Tag color={getStipendColor(stipendStatus)}>{formatEnum(stipendStatus)}</Tag>
        </div>

        {/* Standardized 3-Column Metadata Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-white/[0.025] rounded-[var(--radius)] border border-white/[0.08] mb-5">
          <div className="min-w-0">
            <span className="block text-[10.5px] font-heading uppercase tracking-wider text-foreground-subtle mb-0.5 truncate">Mode</span>
            <span className="block text-[12.5px] font-semibold text-foreground truncate">{formatEnum(mode)}</span>
          </div>
          <div className="min-w-0 border-l border-white/[0.08] pl-2 sm:pl-2.5">
            <span className="block text-[10.5px] font-heading uppercase tracking-wider text-foreground-subtle mb-0.5 truncate">Duration</span>
            <span className="block text-[12.5px] font-semibold text-foreground truncate">{formatEnum(durationCategory)}</span>
          </div>
          <div className="min-w-0 border-l border-white/[0.08] pl-2 sm:pl-2.5">
            <span className="block text-[10.5px] font-heading uppercase tracking-wider text-foreground-subtle mb-0.5 truncate">Reviewed</span>
            <span className="block text-[12.5px] font-semibold text-foreground truncate">{formattedDate}</span>
          </div>
        </div>
      </div>
      
      {/* Footer Link */}
      <div className="mt-auto pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <Link 
          href={slug?.current ? `/internships/${slug.current}` : '#'} 
          className="inline-flex items-center text-accent font-heading font-bold text-[13px] tracking-wider uppercase group-hover:text-accent-hover group-hover:underline transition-all"
        >
          <span>VIEW INTERNSHIP</span>
          <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}


