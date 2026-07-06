import type { Project } from '@/content/projects';

// Server Component by default — no interactivity, no browser APIs, so no
// 'use client'. Renders a single project as a card.
export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </>
  );

  const className =
    'block rounded-lg border border-line bg-paper p-6 transition-colors hover:border-accent';

  if (project.href) {
    return (
      <a href={project.href} className={className}>
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}
