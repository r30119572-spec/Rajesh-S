import { ABOUT_CONTENT, PERSONAL_DETAILS } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

export function AboutSection() {
  return (
    <section id="about" className="relative bg-[#080808] py-20 sm:py-24">
      <div className="crimson-hairline mx-auto mb-20 h-px max-w-6xl opacity-50" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Narrative */}
          <div className="min-w-0 lg:col-span-7">
            <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
              01. Profile &amp; Background
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {ABOUT_CONTENT.heading}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#B8B8B8]">
              <span>{PERSONAL_DETAILS.education}</span>
              <span aria-hidden="true" className="text-[#FF2525]">
                /
              </span>
              <span>{PERSONAL_DETAILS.location}</span>
            </div>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-[#B8B8B8]">
              {ABOUT_CONTENT.paragraphs.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? 'text-white/95 font-medium' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Highlight My Knowledge Card */}
          <div className="lg:col-span-5">
            <TiltCard className="p-6 sm:p-8" intensity={5}>
              <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
                Core Disciplines
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-white">
                Highlight My Knowledge
              </h3>
              <p className="mt-2 text-sm text-[#B8B8B8]">
                Practical foundations across organic search, social storytelling, paid campaign
                structure, and measurement.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {ABOUT_CONTENT.knowledgeHighlights.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-center justify-between border-b border-white/8 pb-3 text-sm font-medium text-white last:border-b-0 last:pb-0"
                  >
                    <span>{item}</span>
                    <span className="font-mono text-xs text-[#FF2525] tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
