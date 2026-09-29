import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button(props: ButtonProps | AnchorProps) {
  const { variant = 'primary', href, className = '', children, ...rest } = props;
  
  const baseStyles = 'inline-flex justify-center items-center font-heading text-h3 transition-all duration-200 px-6 py-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none rounded-[var(--radius)] select-none';
  
  const variants = {
    primary: 'bg-white !text-black hover:!text-black border-2 border-white shadow-sm hover:-translate-y-[1px] hover:shadow-md hover:bg-white/90 font-bold',
    secondary: 'bg-transparent !text-foreground border-2 border-border hover:-translate-y-[1px] hover:border-foreground hover:bg-surface-hover font-semibold',
    ghost: 'bg-transparent !text-foreground-muted hover:!text-foreground hover:bg-surface-hover border-2 border-transparent font-medium'
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
