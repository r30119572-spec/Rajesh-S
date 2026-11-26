export type SkillCategoryId =
  | 'all'
  | 'seo'
  | 'smm'
  | 'paid-ads'
  | 'analytics'
  | 'content';

export interface SkillCategory {
  id: Exclude<SkillCategoryId, 'all'>;
  title: string;
  subtitle: string;
  skills: string[];
}

export interface WorkSampleItem {
  id: string;
  label: string;
  url: string;
}

export interface ProjectItem {
  id: 'infinix-360' | 'fita-academy' | 'sap-fico-chennai' | 'eagle-hitech';
  order: number;
  featured: boolean;
  badge: string;
  title: string;
  company: string;
  role: string;
  duration: string;
  shortDescription: string;
  image?: string;
  imageAlt?: string;
  responsibilities: string[];
  skillsUsed: string[];
  toolsUsed: string[];
  workSamples: WorkSampleItem[];
  caseStudyNotes: string;
  projectLink: string;
  editable: boolean;
}

export interface ProjectEditablePatch {
  role?: string;
  duration?: string;
  responsibilities?: string[];
  skillsUsed?: string[];
  toolsUsed?: string[];
  workSamples?: WorkSampleItem[];
  caseStudyNotes?: string;
  projectLink?: string;
}

export function isSafeHttpUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function sanitizeSafeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  return isSafeHttpUrl(trimmed) ? trimmed : '';
}

export function filterSkillCategories(
  categories: SkillCategory[],
  activeCategory: SkillCategoryId,
): SkillCategory[] {
  if (activeCategory === 'all') return categories;
  return categories.filter((category) => category.id === activeCategory);
}

export function applyProjectEdit(
  projects: ProjectItem[],
  projectId: ProjectItem['id'],
  patch: ProjectEditablePatch,
): ProjectItem[] {
  return projects.map((project) => {
    if (project.id !== projectId) return project;

    const cleanResponsibilities =
      patch.responsibilities !== undefined
        ? patch.responsibilities.map((item) => item.trim()).filter(Boolean)
        : project.responsibilities;

    const cleanSkills =
      patch.skillsUsed !== undefined
        ? patch.skillsUsed.map((item) => item.trim()).filter(Boolean)
        : project.skillsUsed;

    const cleanTools =
      patch.toolsUsed !== undefined
        ? patch.toolsUsed.map((item) => item.trim()).filter(Boolean)
        : project.toolsUsed;

    const cleanSamples =
      patch.workSamples !== undefined
        ? patch.workSamples
            .map((sample) => ({
              id: sample.id,
              label: sample.label.trim(),
              url: sanitizeSafeUrl(sample.url),
            }))
            .filter((sample) => sample.label.length > 0)
        : project.workSamples;

    return {
      ...project,
      role: patch.role !== undefined ? patch.role.trim() : project.role,
      duration: patch.duration !== undefined ? patch.duration.trim() : project.duration,
      responsibilities: cleanResponsibilities,
      skillsUsed: cleanSkills,
      toolsUsed: cleanTools,
      workSamples: cleanSamples,
      caseStudyNotes:
        patch.caseStudyNotes !== undefined ? patch.caseStudyNotes.trim() : project.caseStudyNotes,
      projectLink:
        patch.projectLink !== undefined
          ? sanitizeSafeUrl(patch.projectLink)
          : project.projectLink,
    };
  });
}

export function computeActiveSection(
  sectionOffsets: Array<{ id: string; top: number; height: number }>,
  scrollY: number,
  offsetThreshold = 140,
): string {
  if (sectionOffsets.length === 0) return 'home';
  const cursor = scrollY + offsetThreshold;
  let current = sectionOffsets[0].id;
  for (const section of sectionOffsets) {
    if (cursor >= section.top) {
      current = section.id;
    }
  }
  return current;
}
