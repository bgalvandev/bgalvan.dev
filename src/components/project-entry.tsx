import type { Project } from '@/content/projects';

// Server Component by default — no interactivity, no browser APIs. Renders one
// project as a year-led list row; the whole row is a link when `href` is set.
export function ProjectEntry({ project }: { project: Project }) {
  const inner = (
    <>
      <span className="pt-1 font-mono text-xs tabular-nums text-muted">
        {project.year}
      </span>
      <div>
        <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
          {project.title}
          {project.href && (
            <span
              aria-hidden
              className="ml-1 inline-block text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
            >
              ↗
            </span>
          )}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
        <ul className="tech-list mt-3 flex flex-wrap font-mono text-xs text-muted">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </>
  );

  const className =
    'group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 sm:grid-cols-[5rem_1fr] sm:gap-8';

  if (project.href) {
    return (
      <a href={project.href} className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}
