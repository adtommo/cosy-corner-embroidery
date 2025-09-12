import { render, screen } from '@testing-library/react';
import FeaturesSection from './FeaturesSection';
import '@testing-library/jest-dom';

describe('FeaturesSection', () => {
  beforeEach(() => {
    render(<FeaturesSection />);
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', {
      name: /ready when you are\./i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders all feature titles', () => {
    const titles = [
      'Mobile-First by Design',
      'Lightning-Fast Performance',
      'Beyond Templates. Beyond Limits',
      'Modern Sites. Real Results',
    ];

    titles.forEach((title) => {
      const element = screen.getByRole('heading', { name: title });
      expect(element).toBeInTheDocument();
    });
  });

  it('renders all feature descriptions', () => {
    const descriptions = [
      'Built to perform flawlessly on phones, tablets, and every screen in between.',
      'Speed that keeps users engaged — and Google happy.',
      'Positions you as a step above DIY platforms.',
      'Simple, direct, results-driven.',
    ];

    descriptions.forEach((desc) => {
      const element = screen.getByText(desc);
      expect(element).toBeInTheDocument();
    });
  });

  it('has an accessible section with aria-labelledby pointing to the main heading', () => {
    const section = screen.getByRole('region', { hidden: true });
    const heading = screen.getByRole('heading', {
      name: /ready when you are\./i,
    });
    expect(section).toHaveAttribute('aria-labelledby', heading.id);
  });
});
