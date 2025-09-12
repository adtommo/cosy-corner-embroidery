import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import TermsPage from './TermsPage';
import { describe, it, expect } from 'vitest';

describe('TermsPage', () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <TermsPage />
      </HelmetProvider>,
    );
  });

  it('sets the correct document title', async () => {
    await waitFor(() => {
      expect(document.title).toContain(
        'Terms & Conditions | Atomic Rocket Digital',
      );
    });
  });

  it('renders the hero heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Terms & Conditions/i,
    });
    expect(heading).toBeDefined();
  });

  it('renders the hero subheading', () => {
    const subheading = screen.getByText(
      /Our terms of service for using Atomic Rocket Digital's website and services/i,
    );
    expect(subheading).toBeDefined();
  });

  it('renders the last updated text', () => {
    const lastUpdated = screen.getByText(/Last Updated: December 2024/i);
    expect(lastUpdated).toBeDefined();
  });

  it('renders section headings', () => {
    const sections = [
      '1. Acceptance of Terms',
      '2. Definitions',
      '3. Use License',
      '4. Website Use and Contact Forms',
      '5. User Conduct',
      '6. Governing Law',
      '7. Contact Information',
    ];

    sections.forEach((title) => {
      const heading = screen.getByRole('heading', {
        name: new RegExp(title, 'i'),
      });
      expect(heading).toBeDefined();
    });
  });

  it('renders contact email', () => {
    const emails = screen.getAllByText(/hello@atomicrocketdigital.com/i);
    expect(emails.length).toBeGreaterThan(0);
    emails.forEach((email) => {
      expect(email).toBeDefined();
    });
  });

  it('renders JSON-LD script with TermsOfService', async () => {
    // Wait for the script to be added to the DOM
    await waitFor(() => {
      const jsonLdScript = document.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(jsonLdScript).toBeDefined();
      const text = jsonLdScript?.textContent;
      expect(text).toBeDefined();
      expect(text).toContain('TermsOfService');
      expect(text).toContain('Atomic Rocket Digital Terms & Conditions');
    });
  });
});
