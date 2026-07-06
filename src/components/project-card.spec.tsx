import { render, screen } from '@testing-library/react';
import { ProjectCard } from './project-card';
import type { Project } from '@/content/projects';

const project: Project = {
  slug: 'demo',
  title: 'Demo Project',
  summary: 'A short description.',
  stack: ['TypeScript', 'React'],
};

describe('ProjectCard', () => {
  it('renders the title, summary, and stack', () => {
    render(<ProjectCard project={project} />);

    expect(
      screen.getByRole('heading', { name: 'Demo Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('A short description.')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(
      <ProjectCard project={{ ...project, href: 'https://example.com' }} />,
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });
});
