import { ArrowUpRight, Briefcase, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '../utils/portfolioState';
import { TiltCard } from './TiltCard';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const orderedProjects = [...projects].sort((a, b) => a.order - b.order);
  const primaryProject = orderedProjects[0];
  const secondaryProjects = orderedProjects.slice(1);

  return (
    <section id="projects" className="relative bg-[#080808] py-20 sm:py-24">
      <div className="crimson-hairline mx-auto mb-20 h-px max-w-6xl opacity-40" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
            03. Experience &amp; Practical Work
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Projects &amp; Professional Experience
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
            Internship roles, practical digital marketing training, and structured SEO projects —
            with editable work-sample and case-study documentation.
          </p>
        </div>

        {/* Project 1: Primary Featured Internship (Infinix 360) */}
        {primaryProject && (
          <div className="mt-10" data-testid="primary-internship-card">
            <TiltCard featured intensity={4} className="group p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#FF2525]">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{primaryProject.badge}</span>
                    </span>
                    <span className="font-mono text-xs text-[#B8B8B8]">
                      {primaryProject.duration}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                    <div className="min-w-0 lg:col-span-5">
                      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                        {primaryProject.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#B8B8B8]">
                        Company:{' '}
                        <span className="font-semibold text-white">{primaryProject.company}</span>{' '}
                        <span aria-hidden="true">·</span> Position:{' '}
                        <span className="font-semibold text-white">{primaryProject.role}</span>
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                        {primaryProject.shortDescription}
                      </p>
                    </div>

                    <div className="grid min-w-0 gap-5 border-t border-white/10 pt-5 sm:grid-cols-2 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                      <div>
                        <p className="font-mono text-xs font-semibold text-white">Responsibilities</p>
                        <ul className="mt-2.5 space-y-2">
                          {primaryProject.responsibilities.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs leading-relaxed text-[#B8B8B8]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#FF2525]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="font-mono text-xs font-semibold text-white">Skills Used</p>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#B8B8B8]">
                            {primaryProject.skillsUsed.join(' · ')}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-xs font-semibold text-white">
                            Tools &amp; Platforms
                          </p>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#B8B8B8]">
                            {primaryProject.toolsUsed.join(' · ')}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-xs font-semibold text-white">Work Samples</p>
                          <p className="mt-1.5 text-xs text-[#B8B8B8]">
                            {primaryProject.workSamples.map((s) => s.label).join(' · ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() => onSelectProject(primaryProject)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#FF2525] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#e01e1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  {primaryProject.projectLink && (
                    <a
                      href={primaryProject.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/15 bg-[#080808] px-4 py-2 text-xs font-semibold text-white hover:border-[#FF2525]/60"
                    >
                      <span>Project Link</span>
                      <ExternalLink className="h-3.5 w-3.5 text-[#FF2525]" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </div>
        )}

        {/* Projects 2, 3, 4 in Exact Sequence */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((project) => (
            <div key={project.id} data-testid={`project-card-${project.id}`} className="min-w-0">
              <TiltCard intensity={5} className="group flex flex-col">
                <div className="flex h-full flex-col justify-between">
                  <div className="p-6">
                    <p className="font-mono text-xs font-medium text-[#FF2525]">
                      {project.badge} <span aria-hidden="true">·</span> {project.company}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">
                      {project.title}
                    </h3>

                    {project.id === 'eagle-hitech' && (
                      <p className="mt-2 text-xs text-[#B8B8B8]">
                        Role: <span className="text-white">{project.role}</span>{' '}
                        <span aria-hidden="true">·</span> {project.duration}
                      </p>
                    )}

                    <p className="mt-3 text-sm leading-relaxed text-[#B8B8B8]">
                      {project.shortDescription}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      {project.responsibilities.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-[#B8B8B8]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#FF2525]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <p className="font-mono text-[11px] font-semibold text-white">
                        Skills &amp; Focus
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#B8B8B8]">
                        {project.skillsUsed.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#FF2525]/55 bg-[#FF2525]/12 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#FF2525] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <span className="font-mono text-[11px] text-[#B8B8B8]">Case study ready</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
