import { useTranslations } from 'next-intl';
import { ProjectEntry } from '@/components/project-entry';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleSwitcher } from '@/i18n/locale-switcher';
import { projects } from '@/content/projects';

export default function HomePage() {
  const t = useTranslations('home');
  const tp = useTranslations('projects');

  const meta = [
    { label: t('statusLabel'), value: t('statusValue') },
    { label: t('focusLabel'), value: t('focusValue') },
    { label: t('basedLabel'), value: t('basedValue') },
  ];

  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <div className="mb-10 flex items-center justify-end gap-3">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      <header>
        <p className="font-mono text-sm text-muted">{t('name')}</p>
        <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {t('headline')}
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          {t('intro')}
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
          {t('work')}
        </h2>
        <div className="mt-2">
          {projects.map((project) => (
            <ProjectEntry
              key={project.slug}
              project={project}
              title={tp(`${project.slug}.title`)}
              summary={tp(`${project.slug}.summary`)}
            />
          ))}
        </div>
      </section>

      <footer className="mt-20 border-t border-line pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {t('contact')}
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
