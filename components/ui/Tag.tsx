import React from 'react';

type TagColor = 'positive' | 'caution' | 'neutral';

interface TagProps {
  children: React.ReactNode;
  color?: TagColor;
  className?: string;
}

const colorStyles: Record<TagColor, string> = {
  positive: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25',
  caution: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/25',
  neutral: 'bg-white/[0.04] text-foreground-muted border-white/10',
};

export default function Tag({ children, color = 'neutral', className = '' }: TagProps) {
  return (
    <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-heading font-semibold uppercase tracking-wider rounded-[var(--radius)] border ${colorStyles[color]} ${className}`}>
      {children}
    </span>
  );
}

