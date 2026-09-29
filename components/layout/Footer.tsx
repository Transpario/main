import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-0">
      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left: Brand */}
          <div className="shrink-0">
            <div className="font-heading font-bold text-[18px] leading-none tracking-tight uppercase text-foreground">
              Transpario
            </div>
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-foreground-subtle mt-1.5">
              Know Before You Apply
            </p>
          </div>

          {/* Center: Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-heading font-semibold uppercase tracking-[0.1em]">
            <Link href="/explore" className="text-foreground-subtle hover:text-foreground transition-colors">
              Index
            </Link>
            <Link href="/about" className="text-foreground-subtle hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/guidelines" className="text-foreground-subtle hover:text-foreground transition-colors">
              Guidelines
            </Link>
            <Link href="/faq" className="text-foreground-subtle hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-foreground-subtle hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right: Social */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/company/transpario/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow Transpario on LinkedIn"
              className="text-foreground-subtle hover:text-foreground transition-colors"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.66a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
              </svg>
            </a>
            <a 
              href="https://whatsapp.com/channel/0029VbDKK3yDDmFZSLUN9X2H" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Join Transpario WhatsApp Channel"
              className="text-foreground-subtle hover:text-foreground transition-colors"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.19 8.19 0 0 1-5.82 2.42c-1.46 0-2.9-.38-4.17-1.12l-.3-.18-3.1.81.83-3.02-.19-.31A8.2 8.2 0 0 1 3.8 11.91c0-4.54 3.7-8.24 8.25-8.24m-4.52 4.27c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.19 1.93 2.95 4.67 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.53-.32-.28-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.19.28-.73.89-.89 1.07-.17.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.41-1.68-1.57-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.17.18-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.62-1.49-.85-2.04-.23-.55-.46-.48-.63-.48Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[11px] text-foreground-subtle tracking-wide">
          <p>
            Information can change. Always review the latest available details before applying.
          </p>
          <p className="font-heading font-bold uppercase tracking-[0.1em] text-foreground-muted whitespace-nowrap">
            &copy; 2026 Transpario
          </p>
        </div>
      </div>
    </footer>
  );
}
