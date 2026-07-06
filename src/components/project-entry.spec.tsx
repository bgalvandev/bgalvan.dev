import { render, screen } from '@testing-library/react';
import { ProjectEntry } from './project-entry';
import type { Project } from '@/content/projects';

const project: Project = {
  slug: 'demo',
  year: '2026',
  title: 'Demo Project',
  summary: 'A short description.',
  stack: ['TypeScript', 'React'],
};

describe('ProjectEntry', () => {
  it('renders the year, title, summary, and stack', () => {
    render(<ProjectEntry project={project} />);

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
      <ProjectEntry project={{ ...project, href: 'https://example.com' }} />,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });
});
