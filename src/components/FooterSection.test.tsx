import { render, screen, fireEvent } from '@testing-library/react';
import FooterSection from './FooterSection';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('FooterSection', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FooterSection />
      </MemoryRouter>,
    );
  });

  it('renders the footer heading and description', () => {
    const heading = screen.getByRole('heading', {
      name: /atomic rocket digital/i,
    });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /building modern, fast, and reliable websites\./i,
    );
    expect(description).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    const links = [
      /about/i,
      /our plans/i,
      /contact/i,
      /terms & conditions/i,
      /privacy policy/i,
      /accessibility/i,
    ];

    links.forEach((text) => {
      const link = screen.getByRole('link', { name: text });
      expect(link).toBeInTheDocument();
    });
  });

  it('renders all social media links', () => {
    const socialLinks = [
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
    ];

    socialLinks.forEach(({ label, href }) => {
      const link = screen.getByRole('link', { name: label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders the copyright text', () => {
    const currentYear = new Date().getFullYear().toString();
    const copyright = screen.getByText(
      new RegExp(
        `© ${currentYear} Atomic Rocket Digital. All rights reserved.`,
        'i',
      ),
    );
    expect(copyright).toBeInTheDocument();
  });

  // Generic scroll link test helper
  const testScrollLink = (linkName: string) => {
    vi.useFakeTimers();

    const scrollIntoViewMock = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as unknown as HTMLElement);

    const link = screen.getByRole('link', { name: new RegExp(linkName, 'i') });
    fireEvent.click(link);

    // Run the requestAnimationFrame queue
    vi.advanceTimersByTime(16);
    vi.runAllTimers();

    expect(scrollIntoViewMock).toHaveBeenCalled();

    vi.useRealTimers();
  };

  it('calls handleScroll when "Our Plans" link is clicked', () => {
    testScrollLink('Our Plans');
  });

  it('calls handleScroll when "Contact" link is clicked', () => {
    testScrollLink('Contact');
  });
});
