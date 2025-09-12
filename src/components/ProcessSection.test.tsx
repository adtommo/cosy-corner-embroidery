import { render, screen } from '@testing-library/react';
import ProcessSection from './ProcessSection';

describe('ProcessSection', () => {
  beforeEach(() => {
    render(<ProcessSection />);
  });

  it('renders the main heading and subheading', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /our process/i,
    );
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      /transform your business in 5 simple steps/i,
    );
  });

  it('renders all 5 steps with labels and descriptions', () => {
    const stepLabels = [
      'Take a look',
      'Free Consultation',
      'The Build',
      'The Review',
      'The Go-Live',
    ];

    stepLabels.forEach((label) => {
      const labelElements = screen.getAllByText(new RegExp(label, 'i'));
      expect(labelElements.length).toBeGreaterThan(0);
    });

    const stepDescriptions = [
      'Explore the range of plans we offer below',
      'Tell us a little about your goals',
      'Through a series of collaborative sessions',
      "You'll have dedicated time to review everything agreed",
      "Once we've finalized everything and you're happy",
    ];

    stepDescriptions.forEach((descPart) => {
      const descElements = screen.getAllByText(new RegExp(descPart, 'i'));
      expect(descElements.length).toBeGreaterThan(0);
    });
  });
});
