'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavButton, setShowNavButton] = useState(pathname !== '/');

  useEffect(() => {
    if (pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowNavButton(true);
      return;
    }

    setShowNavButton(false);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowNavButton(true);
      } else {
        setShowNavButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: '/explore', label: 'Index' },
    { href: '/review', label: 'Experiences' },
    { href: '/about', label: 'About' },
  ];

  const mobileLinks = [
    { href: '/explore', label: 'Index' },
    { href: '/review', label: 'Experiences' },
    { href: '/about', label: 'About' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/guidelines', label: 'Guidelines' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-white/[0.06] h-[68px] flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex-shrink-0 z-50 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-[var(--radius)] flex items-center justify-center transition-opacity hover:opacity-90"
        >
          <Image 
            src="/Logo.svg" 
            alt="Transpario" 
            width={130} 
            height={39} 
            className="h-[39px] w-auto object-contain" 
            priority 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-[13px] font-heading font-semibold uppercase tracking-[0.12em] py-1 transition-colors duration-200 ${
                  isActive 
                    ? 'text-foreground' 
                    : 'text-foreground-subtle hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <Link 
            href="/review" 
            className={`ml-2 inline-flex justify-center items-center gap-2 h-[38px] px-5 bg-white !text-black font-heading font-bold text-[12px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:!text-black hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:translate-y-0 transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 select-none shrink-0 ${
              showNavButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <span>Report an Internship</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-2 text-foreground focus-visible:outline-2 focus-visible:outline-accent rounded-[var(--radius)] cursor-pointer hover:bg-surface-hover transition-colors"
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/98 backdrop-blur-md z-40 md:hidden flex flex-col pt-[68px]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col gap-0 p-6 text-base font-medium overflow-y-auto">
            {mobileLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu} 
                className={`transition-colors block py-4 border-b border-white/[0.06] text-[15px] font-heading font-semibold uppercase tracking-[0.08em] ${
                  pathname === link.href ? 'text-foreground' : 'text-foreground-subtle hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 mt-2">
              <Link 
                href="/review" 
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 h-[44px] w-full bg-white !text-black hover:!text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 transition-all"
              >
                <span>Report an Internship</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
