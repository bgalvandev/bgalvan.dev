import { ProjectCard } from '@/components/project-card';
import { projects } from '@/content/projects';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <header>
        <p className="font-mono text-sm text-accent">Bruno Galván</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Software engineer building
          <br />
          calm, well-made products.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          I care about clear architecture, fast interfaces, and details that
          hold up. Below is a selection of things I&apos;ve worked on.
        </p>
      </header>

      <section className="mt-16" aria-labelledby="work">
        <h2
          id="work"
          className="font-mono text-sm uppercase tracking-wide text-muted"
        >
          Selected work
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <footer className="mt-24 border-t border-line pt-8 text-sm text-muted">
        <a href="mailto:bruno@clinicsay.com" className="hover:text-accent">
          bruno@clinicsay.com
        </a>
      </footer>
    </main>
  );
}
