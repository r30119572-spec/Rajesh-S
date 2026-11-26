import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';
import { prefersReducedMotion } from '../utils/webglDetect';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const reducedMotion = prefersReducedMotion();

  const scrollTo = (id: string) => {
    onNavigate(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-[#080808] py-12 sm:py-16 lg:py-20"
    >
      {/* Subtle architectural dark grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Left Column: Typographic Hierarchy */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="min-w-0 lg:col-span-6"
        >
          <p className="text-sm font-medium tracking-wide text-[#B8B8B8]">
            {PERSONAL_DETAILS.profession} <span aria-hidden="true">·</span> {PERSONAL_DETAILS.location}
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-[#FF2525]">Rajesh</span>.
          </h1>

          <p className="mt-5 text-sm font-medium leading-relaxed text-white/90 sm:text-base">
            {PERSONAL_DETAILS.disciplinesLine}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#B8B8B8]">
            &ldquo;{PERSONAL_DETAILS.heroStatement}&rdquo;
          </p>

          <p className="mt-6 font-display text-base font-semibold tracking-tight text-white sm:text-lg">
            {PERSONAL_DETAILS.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#FF2525] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 shadow-[0_0_28px_-6px_rgba(255,37,37,0.7)] transition-all duration-150 hover:bg-[#e01e1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Explore My Work</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 bg-[#121212] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-all duration-150 hover:border-[#FF2525]/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="h-4 w-4 text-[#FF2525]" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Creative 3D Visual Only (No fake analytics or stats) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="min-w-0 lg:col-span-6"
        >
          <Hero3DCanvas />
        </motion.div>
      </div>
    </section>
  );
}
