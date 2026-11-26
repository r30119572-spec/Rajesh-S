import { motion } from 'motion/react';
import { GROWTH_CONTENT } from '../data/portfolioData';
import { Growth3DCanvas } from './Growth3DCanvas';
import { prefersReducedMotion } from '../utils/webglDetect';

export function GrowthSection() {
  const reducedMotion = prefersReducedMotion();

  return (
    <section id="growth" className="relative bg-[#080808] py-20 sm:py-24">
      <div className="crimson-hairline mx-auto mb-20 h-px max-w-6xl opacity-40" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#FF2525]/30 bg-[#121212] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0 lg:col-span-7"
            >
              <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
                06. Mindset &amp; Craft
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {GROWTH_CONTENT.heading}
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#B8B8B8]">
                {GROWTH_CONTENT.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </motion.div>

            <div className="min-w-0 lg:col-span-5">
              <Growth3DCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
