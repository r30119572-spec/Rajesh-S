import { TOOLS_LIST } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { ToolLogo } from './ToolLogos';

export function ToolsSection() {
  return (
    <section id="tools" className="relative bg-[#080808] py-20 sm:py-24">
      <div className="crimson-hairline mx-auto mb-20 h-px max-w-6xl opacity-40" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
            05. Stack &amp; Platforms
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tools I Use
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
            Industry platforms for search diagnostics, tag management, analytics, keyword planning,
            creative production, and editorial quality review.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS_LIST.map((tool) => (
            <TiltCard key={tool.id} className="p-5 sm:p-6" intensity={6}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <ToolLogo id={tool.id} />
                </div>
                <div>
                  <p className="font-mono text-[11px] font-medium text-[#FF2525]">
                    {tool.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{tool.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#B8B8B8]">
                    {tool.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
