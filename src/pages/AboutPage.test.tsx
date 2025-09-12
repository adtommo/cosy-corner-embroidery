import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import AboutPage from './AboutPage';
import { describe, it, vi, beforeEach, expect } from 'vitest';

describe('AboutPage', () => {
  // Mock scrollIntoView globally
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    render(
      <HelmetProvider>
        <AboutPage />
      </HelmetProvider>,
    );
  });

  it('sets the correct document title', async () => {
    await waitFor(() => {
      expect(document.title).toContain('About Us | Atomic Rocket Digital');
    });
  });

  it('renders the hero heading', () => {
    const heading = screen.getByRole('heading', {
      name: /About Atomic Rocket Digital/i,
    });
    expect(heading).toBeDefined();
  });

  it('renders the "Read our story" button', () => {
    const button = screen.getByText(/Read our story/i);
    expect(button).toBeDefined();
  });

  it('renders the "Our founding" section', () => {
    const section = screen.getByRole('region', {
      name: /Our founding story/i,
    });
    expect(section).toBeDefined();
  });

  it('renders the "Growth & beyond" section', () => {
    const section = screen.getByRole('region', {
      name: /Growth and innovation/i,
    });
    expect(section).toBeDefined();
  });

  it('renders the team section with member name', () => {
    const teamHeading = screen.getByRole('heading', {
      name: /The Person Behind Atomic Rocket Digital/i,
    });
    expect(teamHeading).toBeDefined();

    const memberName = screen.getByText(/Adam T/i);
    expect(memberName).toBeDefined();
  });

  it('scroll button triggers scrollIntoView', () => {
    const button = screen.getByText(/Read our story/i);
    fireEvent.click(button);

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
