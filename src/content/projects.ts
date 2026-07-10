// Slugs are the stable, locale-neutral keys; the title and summary for each live
// in the message catalogs (src/i18n/messages/*.json) under `projects.<slug>`.
type ProjectSlug = 'project-one' | 'project-two' | 'project-three';

export type Project = {
  slug: ProjectSlug;
  /** Year shipped — drives the indexed list on the home page. */
  year: string;
  stack: string[];
  href?: string;
};

// Placeholder content — replace with your real work. Structure lives here;
// the localized title/summary text lives in the catalogs. Order newest-first.
export const projects: Project[] = [
  {
    slug: 'project-one',
    year: '2026',
    stack: ['TypeScript', 'Next.js', 'PostgreSQL'],
  },
  {
    slug: 'project-two',
    year: '2025',
    stack: ['TypeScript', 'React', 'Node.js'],
  },
  {
    slug: 'project-three',
    year: '2024',
    stack: ['SvelteKit', 'TypeScript', 'Vite'],
  },
];
