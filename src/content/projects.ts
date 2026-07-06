export type Project = {
  slug: string;
  /** Year shipped — drives the indexed list on the home page. */
  year: string;
  title: string;
  summary: string;
  stack: string[];
  href?: string;
};

// Placeholder content — replace with your real work. Keeping the site's data
// here (not hardcoded in components) makes it trivial to move to MDX or a CMS
// later without touching the UI. Order newest-first; `year` is shown as-is.
export const projects: Project[] = [
  {
    slug: 'project-one',
    year: '2026',
    title: 'Project one',
    summary: 'One specific sentence about what it does and why it mattered.',
    stack: ['TypeScript', 'Next.js', 'PostgreSQL'],
  },
  {
    slug: 'project-two',
    year: '2025',
    title: 'Project two',
    summary: 'What problem it solved, for whom, and the outcome you reached.',
    stack: ['React', 'Node.js'],
  },
  {
    slug: 'project-three',
    year: '2024',
    title: 'Project three',
    summary: 'A short, concrete description — plain words over buzzwords.',
    stack: ['TypeScript', 'Svelte'],
  },
];
