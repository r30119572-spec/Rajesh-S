import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { detectSoftwareWebGL } from '../utils/webglDetect';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'tools', label: 'Tools', href: '#tools' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSoftwareGl = detectSoftwareWebGL();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 transition-colors duration-200 ${
        isSoftwareGl ? 'bg-[#080808]/95' : 'bg-[#080808]/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2525]"
        >
          Rajesh<span className="text-[#FF2525]">.</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2525] ${
                  isActive ? 'text-white' : 'text-[#B8B8B8] hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[#FF2525] transition-opacity duration-200 ${
                    isActive
                      ? 'opacity-100 shadow-[0_0_10px_#FF2525]'
                      : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#FF2525] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 shadow-[0_0_24px_-6px_rgba(255,37,37,0.65)] transition-all duration-150 hover:bg-[#e01e1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Let&apos;s Connect
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-[#121212] text-white transition-colors hover:border-[#FF2525]/60 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="border-t border-white/10 bg-[#080808] px-4 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#121212] text-white border border-[#FF2525]/45'
                      : 'text-[#B8B8B8] hover:bg-[#121212] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-6 rounded-full bg-[#FF2525] shadow-[0_0_8px_#FF2525]"
                    />
                  )}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
