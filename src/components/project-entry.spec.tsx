import { render, screen } from '@testing-library/react';
import { ProjectEntry } from './project-entry';
import type { Project } from '@/content/projects';

const project: Project = {
  slug: 'project-one',
  year: '2026',
  stack: ['TypeScript', 'React'],
};

describe('ProjectEntry', () => {
  it('renders the year, title, summary, and stack', () => {
    render(
      <ProjectEntry
        project={project}
        title="Demo Project"
        summary="A short description."
      />,
    );

    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Demo Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('A short description.')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(
      <ProjectEntry
        project={{ ...project, href: 'https://example.com' }}
        title="Demo Project"
        summary="A short description."
      />,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });
});
