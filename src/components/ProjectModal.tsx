import { useEffect, useState } from 'react';
import { ExternalLink, Pencil, Plus, RotateCcw, Save, Trash2, X } from 'lucide-react';
import type { ProjectEditablePatch, ProjectItem, WorkSampleItem } from '../utils/portfolioState';
import { isSafeHttpUrl } from '../utils/portfolioState';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSaveEdit: (projectId: ProjectItem['id'], patch: ProjectEditablePatch) => void;
  onResetProject: (projectId: ProjectItem['id']) => void;
}

export function ProjectModal({
  project,
  onClose,
  onSaveEdit,
  onResetProject,
}: ProjectModalProps) {
  const [editing, setEditing] = useState(false);
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [skillsText, setSkillsText] = useState('');
  const [toolsText, setToolsText] = useState('');
  const [workSamples, setWorkSamples] = useState<WorkSampleItem[]>([]);
  const [caseStudyNotes, setCaseStudyNotes] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    setEditing(false);
    setRole(project.role);
    setDuration(project.duration);
    setResponsibilities([...project.responsibilities]);
    setSkillsText(project.skillsUsed.join(', '));
    setToolsText(project.toolsUsed.join(', '));
    setWorkSamples(project.workSamples.map((s) => ({ ...s })));
    setCaseStudyNotes(project.caseStudyNotes);
    setProjectLink(project.projectLink);
    setUrlError(null);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectLink && !isSafeHttpUrl(projectLink)) {
      setUrlError('Project link must begin with https:// or http://.');
      return;
    }
    const invalidSample = workSamples.find((s) => s.url && !isSafeHttpUrl(s.url));
    if (invalidSample) {
      setUrlError('All work sample links must begin with https:// or http://.');
      return;
    }

    onSaveEdit(project.id, {
      role,
      duration,
      responsibilities,
      skillsUsed: skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      toolsUsed: toolsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      workSamples,
      caseStudyNotes,
      projectLink,
    });
    setUrlError(null);
    setEditing(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#FF2525]/45 bg-[#121212] p-6 shadow-[0_0_60px_-15px_rgba(255,37,37,0.4)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="font-mono text-xs font-medium text-[#FF2525]">
              {project.badge} <span aria-hidden="true">·</span> {project.company}
            </p>
            <h3 id="project-modal-title" className="mt-1.5 font-display text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#080808] text-[#B8B8B8] transition-colors hover:border-[#FF2525] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!editing ? (
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 rounded-xl border border-white/10 bg-[#080808] p-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs text-[#B8B8B8]">Position / Role</p>
                <p className="mt-1 text-sm font-semibold text-white">{project.role}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#B8B8B8]">Duration / Context</p>
                <p className="mt-1 text-sm font-semibold text-white">{project.duration}</p>
              </div>
            </div>

            <div>
              <h4 className="font-display text-base font-semibold text-white">
                Responsibilities &amp; Scope
              </h4>
              <ul className="mt-3 space-y-2.5">
                {project.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[#B8B8B8]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF2525]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-display text-sm font-semibold text-white">Skills Used</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                  {project.skillsUsed.join(' · ')}
                </p>
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-white">Tools &amp; Platforms</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                  {project.toolsUsed.join(' · ')}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-white">
                Work Samples &amp; Case Study Notes
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">{project.caseStudyNotes}</p>

              {project.workSamples.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {project.workSamples.map((sample) => (
                    <li
                      key={sample.id}
                      className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#080808] px-3.5 py-2.5 text-sm"
                    >
                      <span className="text-white/90">{sample.label}</span>
                      {sample.url ? (
                        <a
                          href={sample.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF2525] hover:underline whitespace-nowrap shrink-0"
                        >
                          <span>Open Sample</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="font-mono text-xs text-[#B8B8B8]">Link pending</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#FF2525]/50 bg-[#FF2525]/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#FF2525]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
                >
                  <Pencil className="h-3.5 w-3.5 text-[#FF2525]" aria-hidden="true" />
                  <span>Edit Details &amp; Work Samples</span>
                </button>

                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#FF2525] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#e01e1e]"
                  >
                    <span>Visit Project Link</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] rounded-lg border border-white/15 bg-[#080808] px-4 py-2 text-xs font-semibold text-[#B8B8B8] transition-colors hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="mt-6 space-y-5">
            {urlError && (
              <div
                role="alert"
                className="rounded-lg border border-[#FF2525]/60 bg-[#FF2525]/10 px-4 py-3 text-sm text-white"
              >
                {urlError}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-role" className="block text-xs font-semibold text-[#B8B8B8]">
                  Role / Position
                </label>
                <input
                  id="edit-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-duration" className="block text-xs font-semibold text-[#B8B8B8]">
                  Duration
                </label>
                <input
                  id="edit-duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#B8B8B8]">
                  Responsibilities
                </label>
                <button
                  type="button"
                  onClick={() => setResponsibilities((prev) => [...prev, ''])}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF2525] hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Add Line</span>
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {responsibilities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      aria-label={`Responsibility ${idx + 1}`}
                      value={item}
                      onChange={(e) =>
                        setResponsibilities((prev) =>
                          prev.map((v, i) => (i === idx ? e.target.value : v)),
                        )
                      }
                      className="w-full rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none"
                    />
                    <button
                      type="button"
                      aria-label={`Remove responsibility ${idx + 1}`}
                      onClick={() =>
                        setResponsibilities((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#080808] text-[#B8B8B8] hover:border-[#FF2525] hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-skills" className="block text-xs font-semibold text-[#B8B8B8]">
                  Skills Used (comma-separated)
                </label>
                <input
                  id="edit-skills"
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-tools" className="block text-xs font-semibold text-[#B8B8B8]">
                  Tools &amp; Platforms (comma-separated)
                </label>
                <input
                  id="edit-tools"
                  type="text"
                  value={toolsText}
                  onChange={(e) => setToolsText(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#B8B8B8]">Work Samples</label>
                <button
                  type="button"
                  onClick={() =>
                    setWorkSamples((prev) => [
                      ...prev,
                      { id: `sample-${Date.now()}`, label: '', url: '' },
                    ])
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF2525] hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Add Sample</span>
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {workSamples.map((sample, idx) => (
                  <div key={sample.id} className="grid gap-2 sm:grid-cols-12">
                    <input
                      type="text"
                      placeholder="Sample title"
                      aria-label={`Work sample ${idx + 1} title`}
                      value={sample.label}
                      onChange={(e) =>
                        setWorkSamples((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, label: e.target.value } : item,
                          ),
                        )
                      }
                      className="rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none sm:col-span-5"
                    />
                    <input
                      type="url"
                      placeholder="https://..."
                      aria-label={`Work sample ${idx + 1} URL`}
                      value={sample.url}
                      onChange={(e) =>
                        setWorkSamples((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, url: e.target.value } : item,
                          ),
                        )
                      }
                      className="rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none sm:col-span-6"
                    />
                    <button
                      type="button"
                      aria-label={`Remove sample ${idx + 1}`}
                      onClick={() => setWorkSamples((prev) => prev.filter((_, i) => i !== idx))}
                      className="inline-flex h-9 items-center justify-center rounded-lg border border-white/15 bg-[#080808] text-[#B8B8B8] hover:border-[#FF2525] hover:text-white sm:col-span-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="edit-project-link" className="block text-xs font-semibold text-[#B8B8B8]">
                External Project / Case Study Link (optional)
              </label>
              <input
                id="edit-project-link"
                type="url"
                placeholder="https://..."
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="edit-notes" className="block text-xs font-semibold text-[#B8B8B8]">
                Case Study Notes
              </label>
              <textarea
                id="edit-notes"
                rows={3}
                value={caseStudyNotes}
                onChange={(e) => setCaseStudyNotes(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#080808] px-3 py-2 text-sm text-white focus:border-[#FF2525] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => {
                  onResetProject(project.id);
                  setEditing(false);
                }}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/15 bg-[#080808] px-3.5 py-2 text-xs font-semibold text-[#B8B8B8] hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="min-h-[40px] rounded-lg border border-white/15 bg-[#080808] px-4 py-2 text-xs font-semibold text-[#B8B8B8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#FF2525] px-4 py-2 text-xs font-semibold text-white hover:bg-[#e01e1e]"
                >
                  <Save className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
