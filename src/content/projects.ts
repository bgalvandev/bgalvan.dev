export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  href?: string;
};

// Placeholder content — replace with your real work. Keeping the site's data
// here (not hardcoded in components) makes it trivial to move to MDX or a CMS
// later without touching the UI.
export const projects: Project[] = [
  {
    slug: 'vitalpro',
    title: 'VitalPro',
    summary:
      'Appointment operations platform for service businesses. Nx monorepo, Next.js + Fastify, Clean Architecture.',
    stack: ['Next.js', 'Fastify', 'Prisma', 'PostgreSQL'],
  },
  {
    slug: 'placeholder',
    title: 'Your next project',
    summary:
      'A short, specific sentence about what it does and why it matters.',
    stack: ['TypeScript', 'React'],
  },
];
