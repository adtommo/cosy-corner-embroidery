// src/pages/FeaturedWorkPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import FeaturedWorkPage from './FeaturedWorkPage';
import { describe, it, beforeEach, expect } from 'vitest';

describe('FeaturedWorkPage', () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <FeaturedWorkPage />
      </HelmetProvider>,
    );
  });

  it('sets the correct document title', async () => {
    await waitFor(() => {
      expect(document.title).toContain('Our Work | Atomic Rocket Digital');
    });
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', { name: /Featured Work/i });
    expect(heading).toBeDefined();
  });

  it('renders all featured projects', () => {
    const projects = [
      { title: /Project Alpha/i, desc: /Modern web application/i },
      { title: /Project Beta/i, desc: /Mobile-first e-commerce/i },
      { title: /Project Gamma/i, desc: /Enterprise dashboard/i },
    ];

    projects.forEach(({ title, desc }) => {
      const titleEl = screen.getByText(title);
      const descEl = screen.getByText(desc);
      expect(titleEl).toBeDefined();
      expect(descEl).toBeDefined();
    });
  });

  it('renders images with accessible alt text', () => {
    const alts = [
      /Featured Project 1/i,
      /Featured Project 2/i,
      /Featured Project 3/i,
    ];

    alts.forEach((altText) => {
      const img = screen.getByAltText(altText);
      expect(img).toBeDefined();
    });
  });
});
