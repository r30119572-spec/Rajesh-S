import { ArrowUp, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#080808] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold text-white">
            Designed &amp; Built by Rajesh.
          </p>
          <p className="mt-1 text-xs text-[#B8B8B8]">© 2026 All Rights Reserved.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_DETAILS.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#121212] text-[#B8B8B8] transition-all duration-150 hover:border-[#FF2525]/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href={`mailto:${PERSONAL_DETAILS.email}`}
            aria-label="Email Rajesh"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#121212] text-[#B8B8B8] transition-all duration-150 hover:border-[#FF2525]/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-[#121212] px-3.5 text-xs font-semibold text-white transition-all duration-150 hover:border-[#FF2525]/70 hover:bg-[#FF2525]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
          >
            <ArrowUp className="h-4 w-4 text-[#FF2525]" aria-hidden="true" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
