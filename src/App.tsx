import { useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GrowthSection } from './components/GrowthSection';
import { HeroSection } from './components/HeroSection';
import { NAV_ITEMS, Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ToolsSection } from './components/ToolsSection';
import { INITIAL_PROJECTS } from './data/portfolioData';
import {
  applyProjectEdit,
  computeActiveSection,
  type ProjectEditablePatch,
  type ProjectItem,
} from './utils/portfolioState';
import { prefersReducedMotion } from './utils/webglDetect';

const STORAGE_KEY = 'rajesh_portfolio_projects_v2';

function loadStoredProjects(): ProjectItem[] {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROJECTS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== INITIAL_PROJECTS.length) {
      return INITIAL_PROJECTS;
    }
    return parsed;
  } catch {
    return INITIAL_PROJECTS;
  }
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [projects, setProjects] = useState<ProjectItem[]>(loadStoredProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectItem['id'] | null>(null);

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // Ignore storage quota errors
    }
  }, [projects]);

  // Subtle mouse-following pointer lighting via CSS variables
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const handlePointerMove = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      root.style.setProperty('--pointer-x', `${e.clientX}px`);
      root.style.setProperty('--pointer-y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Scroll spy for active nav highlighting
  useEffect(() => {
    const updateActive = () => {
      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        return {
          id: item.id,
          top: el ? el.offsetTop : 0,
          height: el ? el.offsetHeight : 0,
        };
      });
      setActiveSection(computeActiveSection(offsets, window.scrollY, 160));
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  const handleSaveProjectEdit = (
    projectId: ProjectItem['id'],
    patch: ProjectEditablePatch,
  ) => {
    setProjects((prev) => applyProjectEdit(prev, projectId, patch));
  };

  const handleResetProject = (projectId: ProjectItem['id']) => {
    const defaultItem = INITIAL_PROJECTS.find((p) => p.id === projectId);
    if (!defaultItem) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...defaultItem } : p)),
    );
  };

  return (
    <div ref={rootRef} className="relative min-h-screen bg-[#080808] text-white">
      {/* Subtle fixed mouse-following radial crimson ambient light */}
      <div
        aria-hidden="true"
        className="ambient-pointer-glow pointer-events-none fixed inset-0 z-20"
      />

      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      <main>
        <HeroSection onNavigate={setActiveSection} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setSelectedProjectId(project.id)}
        />
        <ServicesSection />
        <ToolsSection />
        <GrowthSection />
        <ContactSection />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onSaveEdit={handleSaveProjectEdit}
        onResetProject={handleResetProject}
      />
    </div>
  );
}
