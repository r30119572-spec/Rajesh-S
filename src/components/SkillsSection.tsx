import { useState } from 'react';
import { BarChart3, Megaphone, PenTool, Search, Share2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { filterSkillCategories, type SkillCategoryId } from '../utils/portfolioState';
import { TiltCard } from './TiltCard';

const CATEGORY_TABS: Array<{ id: SkillCategoryId; label: string }> = [
  { id: 'all', label: 'All Categories' },
  { id: 'seo', label: 'SEO' },
  { id: 'paid-ads', label: 'Paid Ads (Meta Ads & Google Ads)' },
  { id: 'smm', label: 'Social Media' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'content', label: 'Content Creation' },
];

function getCategoryIcon(id: string) {
  switch (id) {
    case 'seo':
      return Search;
    case 'smm':
      return Share2;
    case 'paid-ads':
      return Megaphone;
    case 'analytics':
      return BarChart3;
    case 'content':
    default:
      return PenTool;
  }
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategoryId>('all');
  const visibleCategories = filterSkillCategories(SKILL_CATEGORIES, activeCategory);

  return (
    <section id="skills" className="relative bg-[#080808] py-20 sm:py-24">
      <div className="crimson-hairline mx-auto mb-20 h-px max-w-6xl opacity-40" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
              02. Skill Matrix
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Skills &amp; Capabilities
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter skill categories"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#121212] p-1.5"
          >
            {CATEGORY_TABS.map((tab) => {
              const selected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525] ${
                    selected
                      ? 'bg-[#FF2525] text-white shadow-[0_0_18px_-4px_rgba(255,37,37,0.75)]'
                      : 'text-[#B8B8B8] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <TiltCard key={category.id} className="p-6" intensity={6}>
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF2525]/35 bg-[#FF2525]/10 text-[#FF2525]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs text-[#B8B8B8] tabular-nums">
                        {category.skills.length} skills
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                      {category.subtitle}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-4">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center justify-between text-sm text-white/90"
                      >
                        <span>{skill}</span>
                        <span
                          aria-hidden="true"
                          className="h-1 w-3 rounded-full bg-[#FF2525]/70"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
