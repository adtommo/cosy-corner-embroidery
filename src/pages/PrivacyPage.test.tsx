// src/pages/PrivacyPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import PrivacyPage from './PrivacyPage';
import { describe, it, beforeEach, expect } from 'vitest';

describe('PrivacyPage', () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <PrivacyPage />
      </HelmetProvider>,
    );
  });

  it('sets the correct document title', async () => {
    await waitFor(() => {
      expect(document.title).toContain(
        'Privacy Policy | Atomic Rocket Digital',
      );
    });
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', { name: /Privacy Policy/i });
    expect(heading).toBeDefined();
  });

  it('renders the hero subheading', () => {
    const subheading = screen.getAllByText(
      /How we collect, use, and protect your personal information/i,
    );
    expect(subheading[0]).toBeDefined();
  });

  it('renders the GDPR compliance chip', () => {
    const chip = screen.getByText(/UK GDPR Compliant/i);
    expect(chip).toBeDefined();
  });

  it('renders key sections by heading', () => {
    const sections = [
      /1\. Introduction/i,
      /2\. Who We Are/i,
      /3\. Information We Collect/i,
      // add other headings if needed
    ];

    sections.forEach((headingText) => {
      const heading = screen.getByRole('heading', { name: headingText });
      expect(heading).toBeDefined();
    });
  });

  it('renders contact email', () => {
    const emails = screen.getAllByText(/hello@atomicrocketdigital.com/i);
    expect(emails[0]).toBeDefined();
  });

  it('renders JSON-LD script', async () => {
    await waitFor(() => {
      const jsonLdScript = document.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(jsonLdScript).toBeDefined();
      expect(jsonLdScript?.textContent).toContain('PrivacyPolicy');
    });
  });
});
