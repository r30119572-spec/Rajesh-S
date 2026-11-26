import type { ProjectItem, SkillCategory } from '../utils/portfolioState';

export const PERSONAL_DETAILS = {
  name: 'Rajesh',
  profession: 'Digital Marketing Professional | Fresher',
  location: 'Chennai, Tamil Nadu',
  education: 'Bachelor of Computer Applications (BCA) – Completed',
  email: 'bcarajesh123@gmail.com',
  linkedinUrl: 'https://www.linkedin.com',
  tagline: 'Growing Brands. Creating Impact. Building Digital Experiences.',
  disciplinesLine:
    'Digital Marketing | SEO | Paid Ads (Meta Ads & Google Ads) | Google Tag Manager | Google Analytics 4 | Content Creation | Social Media | Content Writing',
  heroStatement:
    "I'm passionate about digital marketing, exploring creative strategies, improving online visibility, and helping businesses build a strong digital presence.",
};

export const ABOUT_CONTENT = {
  heading: 'About Me',
  paragraphs: [
    "I'm Rajesh, a BCA graduate with a strong interest in digital marketing and online brand development.",
    'My journey into digital marketing has allowed me to explore different areas, including Search Engine Optimization, social media marketing, content creation, website optimization and paid advertising.',
    'I have developed practical knowledge through my digital marketing training and internship experiences, particularly at Infinix 360, along with my learning experience at FITA Academy and previous internship experience at Eagle Hi-Tech.',
    'I enjoy exploring digital marketing tools, understanding search engine algorithms, researching keywords and developing strategies to improve online visibility.',
    "I'm continuously learning, improving my practical skills and exploring new opportunities to grow professionally in the digital marketing industry.",
  ],
  knowledgeHighlights: [
    'Search Engine Optimization',
    'Paid Advertising (Meta Ads & Google Ads)',
    'Social Media Marketing',
    'Keyword Research',
    'Content Creation',
    'Website Optimization',
    'Google Analytics 4',
    'Google Tag Manager',
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    subtitle: 'Organic discovery, technical health, and structured search architecture.',
    skills: [
      'Keyword Research',
      'On-Page SEO',
      'Off-Page SEO',
      'Technical SEO',
      'SEO Auditing',
      'Content Optimization',
      'Website Optimization',
    ],
  },
  {
    id: 'paid-ads',
    title: 'Paid Advertising (Meta Ads & Google Ads)',
    subtitle: 'Structured campaign setup, targeting alignment, and optimization fundamentals.',
    skills: [
      'Meta Ads',
      'Google Ads',
      'YouTube Ads',
      'Campaign Setup',
      'Campaign Optimization',
      'Lead Generation',
    ],
  },
  {
    id: 'smm',
    title: 'Social Media Marketing',
    subtitle: 'Consistent brand presence, editorial calendars, and organic community reach.',
    skills: [
      'Social Media Management',
      'Content Planning',
      'Content Creation',
      'Audience Engagement',
      'Content Marketing',
      'Brand Awareness',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics and Tracking',
    subtitle: 'Event tracking, search telemetry, and ongoing performance monitoring.',
    skills: [
      'Google Analytics 4',
      'Google Tag Manager',
      'Google Search Console',
      'Performance Analysis',
      'Campaign Monitoring',
    ],
  },
  {
    id: 'content',
    title: 'Content Creation',
    subtitle: 'Visual storytelling, copywriting, and high-clarity social media creatives.',
    skills: [
      'Content Writing',
      'Social Media Creatives',
      'Poster Designing',
      'Carousel Designing',
    ],
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'infinix-360',
    order: 1,
    featured: true,
    badge: 'Primary Internship',
    title: 'Infinix 360 – Digital Marketing Intern',
    company: 'Infinix 360',
    role: 'Digital Marketing Intern',
    duration: 'Internship Duration (Click "View Project" to edit)',
    shortDescription:
      'Primary digital marketing internship experience at Infinix 360, structured with dedicated editable slots for verified internship responsibilities, tools, and work samples.',
    responsibilities: [
      'Editable slot: Add verified Infinix 360 internship responsibilities and daily deliverables here.',
      'Editable slot: Document practical SEO, content, or website optimization tasks handled during the internship.',
    ],
    skillsUsed: [
      'Search Engine Optimization',
      'Keyword Research',
      'Content Creation',
      'Website Optimization',
      'Google Analytics 4',
    ],
    toolsUsed: [
      'Grammarly',
      'Bulk DA PA Checker',
      'Title Rephrase',
      'Duplicate Checker',
      'Ahrefs',
    ],
    workSamples: [
      {
        id: 'infinix-sample-1',
        label: 'Work Sample Placeholder (Add title & link in editor)',
        url: '',
      },
    ],
    caseStudyNotes:
      'Dedicated case study space for Infinix 360 internship work samples, deliverables, and learnings. Use "Edit Details" to update with actual responsibilities and links.',
    projectLink: '',
    editable: true,
  },
  {
    id: 'fita-academy',
    order: 2,
    featured: false,
    badge: 'Training & Practical Work',
    title: 'FITA Academy – Digital Marketing',
    company: 'FITA Academy',
    role: 'Digital Marketing Trainee',
    duration: 'Practical Training',
    shortDescription:
      'Hands-on digital marketing training combining SEO exercises, personal branding, keyword research, website optimization, and social creative design.',
    responsibilities: [
      'Worked on SEO activities and personal branding.',
      'Created social media content, posters and carousel designs.',
      'Explored keyword research and website optimization.',
      'Developed practical knowledge of digital marketing strategies.',
    ],
    skillsUsed: [
      'SEO Activities',
      'Personal Branding',
      'Carousel Designing',
      'Poster Designing',
      'Keyword Research',
      'Website Optimization',
    ],
    toolsUsed: ['Google Keyword Planner', 'Google Search Console', 'SEMrush'],
    workSamples: [
      {
        id: 'fita-sample-1',
        label: 'Social Creatives & Carousel Portfolio (Add link in editor)',
        url: '',
      },
    ],
    caseStudyNotes:
      'Dedicated space for future FITA Academy case studies, personal branding creatives, and SEO audit documentation.',
    projectLink: '',
    editable: true,
  },
  {
    id: 'sap-fico-chennai',
    order: 3,
    featured: false,
    badge: 'SEO Project',
    title: 'SAP FICO Training in Chennai – SEO Project',
    company: 'SAP FICO Training in Chennai',
    role: 'SEO Contributor',
    duration: 'SEO Project',
    shortDescription:
      'Focused search engine optimization work on the SAP FICO Training in Chennai course page covering On-Page, Off-Page, and Technical SEO activities.',
    responsibilities: [
      'Worked on the SAP FICO Training in Chennai course page.',
      'Implemented On-Page SEO, Off-Page SEO and Technical SEO activities.',
      'Worked on website content and keyword optimization.',
      'Contributed to SEO improvements aimed at increasing organic visibility.',
    ],
    skillsUsed: [
      'On-Page SEO',
      'Off-Page SEO',
      'Technical SEO',
      'Content Optimization',
      'Keyword Optimization',
    ],
    toolsUsed: ['Google Search Console', 'Google Keyword Planner', 'SEMrush'],
    workSamples: [
      {
        id: 'sap-fico-sample-1',
        label: 'SAP FICO Training in Chennai Page Notes (Add link in editor)',
        url: '',
      },
    ],
    caseStudyNotes:
      'Dedicated case study space for documenting On-Page, Off-Page, and Technical SEO checklist work completed for the SAP FICO Training in Chennai course page.',
    projectLink: '',
    editable: true,
  },
  {
    id: 'eagle-hitech',
    order: 4,
    featured: false,
    badge: 'Internship Experience',
    title: 'Eagle Hi-Tech – Internship Experience',
    company: 'Eagle Hi-Tech',
    role: 'Intern (Click "View Project" to edit role)',
    duration: 'Duration (Click "View Project" to edit)',
    shortDescription:
      'Previous internship experience at Eagle Hi-Tech with editable fields for internship role, duration, actual responsibilities, skills learned, and work samples.',
    responsibilities: [
      'Editable slot: Add verified internship responsibilities from Eagle Hi-Tech here.',
    ],
    skillsUsed: ['Practical Team Collaboration', 'Digital Documentation', 'Web Fundamentals'],
    toolsUsed: ['Editable slot: Add tools used at Eagle Hi-Tech'],
    workSamples: [
      {
        id: 'eagle-sample-1',
        label: 'Eagle Hi-Tech Work Sample Placeholder (Add link in editor)',
        url: '',
      },
    ],
    caseStudyNotes:
      'Dedicated space for Eagle Hi-Tech internship summary, skills learned, and future work samples.',
    projectLink: '',
    editable: true,
  },
];

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  iconKey:
    | 'search'
    | 'share'
    | 'pen'
    | 'gauge'
    | 'key'
    | 'compass'
    | 'target'
    | 'megaphone'
    | 'layers'
    | 'clipboard';
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    title: 'Search Engine Optimization (SEO)',
    description:
      'Structured On-Page, Off-Page, and Technical SEO practices designed to strengthen crawlability, page relevance, and organic search visibility.',
    iconKey: 'search',
  },
  {
    number: '02',
    title: 'Social Media Management',
    description:
      'Consistent content scheduling, calendar planning, and audience engagement workflows tailored to build recognizable brand channels.',
    iconKey: 'share',
  },
  {
    number: '03',
    title: 'Content Creation',
    description:
      'Thoughtful copywriting, social media creatives, posters, and multi-slide carousel designs crafted for visual clarity and message retention.',
    iconKey: 'pen',
  },
  {
    number: '04',
    title: 'Website Optimization',
    description:
      'Refining page structure, metadata, internal linking, and content hierarchy so visitors and search engines navigate pages smoothly.',
    iconKey: 'gauge',
  },
  {
    number: '05',
    title: 'Keyword Research',
    description:
      'Topic discovery and search-intent mapping using Google Keyword Planner and SEMrush to align pages with real user queries.',
    iconKey: 'key',
  },
  {
    number: '06',
    title: 'Digital Marketing Strategy',
    description:
      'Cohesive multi-channel planning connecting organic search, social media storytelling, content assets, and tracking foundations.',
    iconKey: 'compass',
  },
  {
    number: '07',
    title: 'Google Ads Campaign Setup',
    description:
      'Foundational search and YouTube campaign structuring, keyword grouping, ad copy drafting, and conversion tracking alignment.',
    iconKey: 'target',
  },
  {
    number: '08',
    title: 'Meta Ads Campaign Setup',
    description:
      'Structured campaign setup inside Meta Business Suite including objective selection, audience setup, and creative formatting.',
    iconKey: 'megaphone',
  },
  {
    number: '09',
    title: 'Content Marketing',
    description:
      'Developing informative, brand-aligned articles, captions, and visual series that support long-term audience trust and brand awareness.',
    iconKey: 'layers',
  },
  {
    number: '10',
    title: 'Website SEO Auditing',
    description:
      'Systematic review of on-page elements, heading hierarchy, indexation signals, and content gaps using Search Console and auditing tools.',
    iconKey: 'clipboard',
  },
];

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const TOOLS_LIST: ToolItem[] = [
  {
    id: 'gsc',
    name: 'Google Search Console',
    category: 'Search & Indexing',
    description: 'Indexation checks, query inspection, and technical page diagnostics.',
  },
  {
    id: 'ga4',
    name: 'Google Analytics 4',
    category: 'Analytics',
    description: 'User journey measurement, event tracking, and traffic source review.',
  },
  {
    id: 'keyword-planner',
    name: 'Google Keyword Planner',
    category: 'Keyword Research',
    description: 'Search volume exploration and keyword grouping for SEO and Ads.',
  },
  {
    id: 'gtm',
    name: 'Google Tag Manager',
    category: 'Tagging',
    description: 'Clean container-based tag deployment and conversion trigger setup.',
  },
  {
    id: 'meta-suite',
    name: 'Meta Business Suite',
    category: 'Social & Ads',
    description: 'Page scheduling, creative management, and ad account structure.',
  },
  {
    id: 'semrush',
    name: 'SEMrush',
    category: 'SEO Intelligence',
    description: 'Keyword gap analysis, site audits, and competitive research.',
  },
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    category: 'SEO & Backlinks',
    description: 'Backlink profile inspection, domain authority checks, and keyword explorer.',
  },
  {
    id: 'bulk-da-pa',
    name: 'Bulk DA PA Checker',
    category: 'Domain Authority',
    description: 'Batch Domain Authority and Page Authority checks for outreach and off-page SEO.',
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'Writing & Editing',
    description: 'Grammar, tone, and clarity refinement for web copy and articles.',
  },
  {
    id: 'title-rephrase',
    name: 'Title Rephrase',
    category: 'SEO Copywriting',
    description: 'Crafting clear, click-worthy SEO titles and meta headline variations.',
  },
  {
    id: 'duplicate-checker',
    name: 'Duplicate Checker',
    category: 'Content Originality',
    description: 'Plagiarism and duplicate copy verification before publishing content.',
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'Research & Ideation',
    description: 'Structured content outlining, ideation, and editorial refinement.',
  },
  {
    id: 'zerogpt',
    name: 'ZeroGPT',
    category: 'Content Review',
    description: 'Editorial originality checks to ensure human-written tone and clarity.',
  },
];

export const GROWTH_CONTENT = {
  heading: 'Always Learning. Always Growing.',
  paragraphs: [
    "I'm passionate about continuously developing my digital marketing knowledge, exploring new tools, understanding industry trends and improving my practical skills.",
    'Every project and learning experience is an opportunity to grow, create better strategies and deliver meaningful digital experiences.',
  ],
};

export const CONTACT_CONTENT = {
  heading: "Let's Connect.",
  description:
    "Have an idea, project, collaboration or professional opportunity in mind? I'd love to connect and explore how we can create something meaningful together.",
};
