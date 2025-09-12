// src/components/AccessibilityPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import AccessibilityPage from './AccessibilityPage';
import { describe, it, beforeEach, expect } from 'vitest';

describe('AccessibilityPage', () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <AccessibilityPage />
      </HelmetProvider>,
    );
  });

  it('sets the correct document title', async () => {
    await waitFor(() => {
      expect(document.title).toContain(
        'Accessibility Statement | Atomic Rocket Digital',
      );
    });
  });

  it('renders the hero heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Accessibility Statement/i,
    });
    expect(heading).toBeDefined();
  });

  it('renders the hero description', () => {
    const description = screen.getByText(
      /Our commitment to making our website accessible to everyone/i,
    );
    expect(description).toBeDefined();
  });

  it('renders all accessibility feature cards', () => {
    const features = [
      /Keyboard Navigation/i,
      /Screen Reader Compatible/i,
      /High Contrast/i,
      /Responsive Text/i,
    ];

    features.forEach((feature) => {
      const card = screen.getByRole('region', { name: feature });
      expect(card).toBeDefined();
    });
  });

  it('renders all detailed accessibility sections', () => {
    const sections = [
      /Our Commitment to Accessibility/i,
      /Conformance Status/i,
      /Assistive Technologies/i,
      /Feedback and Support/i,
      /Alternative Contact Methods/i,
      /Legal Compliance/i,
      /Continuous Improvement/i,
      /Contact Information/i,
    ];

    sections.forEach((section) => {
      const heading = screen.getByRole('heading', { name: section });
      expect(heading).toBeDefined();
    });
  });

  it('renders contact email', () => {
    const contact = screen.getAllByText(/hello@atomicrocketdigital.com/i);
    expect(contact).toBeDefined();
  });
});
