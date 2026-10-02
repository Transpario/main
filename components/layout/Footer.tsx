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
              href="https://t.me/transpario" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Join Transpario on Telegram"
              className="text-foreground-subtle hover:text-foreground transition-colors"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
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
