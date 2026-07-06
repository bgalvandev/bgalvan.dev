import { ProjectEntry } from '@/components/project-entry';
import { projects } from '@/content/projects';

// Spec-sheet header — real, editable facts, not decoration. Edit these freely.
const meta = [
  { label: 'Status', value: 'Available for select work' },
  { label: 'Focus', value: 'Web platforms, end to end' },
  { label: 'Based', value: 'Remote' },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <header>
        <p className="font-mono text-sm text-muted">
          Bruno Galván — Software engineer
        </p>
        <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          I build web software that stays clear as it grows.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          I care about clean architecture, fast interfaces, and details that
          hold up. Below is a selection of recent work.
        </p>

        <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 font-mono text-xs">
          {meta.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-muted">{row.label}</dt>
              <dd className="text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="mt-16 sm:mt-20" aria-labelledby="work">
        <h2
          id="work"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Selected work
        </h2>
        <div className="mt-2">
          {projects.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <footer className="mt-20 border-t border-line pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Get in touch
        </p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href="mailto:bruno@clinicsay.com"
            className="text-ink transition-colors hover:text-accent"
          >
            bruno@clinicsay.com
          </a>
          <a
            href="https://github.com/bgalvandev"
            className="text-ink transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
