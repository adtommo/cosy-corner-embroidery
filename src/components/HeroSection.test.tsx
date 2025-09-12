import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import HeroSection from './HeroSection';
import { vi } from 'vitest';

describe('HeroSection', () => {
  const renderWithHelmet = (ui: React.ReactNode) =>
    render(<HelmetProvider>{ui}</HelmetProvider>);

  it('renders the heading and subheading', () => {
    renderWithHelmet(<HeroSection />);

    const heading = screen.getByRole('heading', {
      name: /Premium, Bespoke Websites & Automated Solutions/i,
    });
    expect(heading).toBeInTheDocument();

    const subheading = screen.getByText(
      /We design and develop responsive mobile-first sites/i,
    );
    expect(subheading).toBeInTheDocument();
  });

  it('renders the "Get Started" and "Learn More" buttons', () => {
    renderWithHelmet(<HeroSection />);

    const getStartedBtn = screen.getByRole('button', { name: /Get Started/i });
    expect(getStartedBtn).toBeInTheDocument();

    const learnMoreLink = screen.getByRole('link', { name: /Learn More/i });
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute('href', '/about-us');
  });

  it('scrolls to process section when "Get Started" is clicked', () => {
    renderWithHelmet(<HeroSection />);

    const scrollIntoViewMock = vi.fn();
    const fakeElement = { scrollIntoView: scrollIntoViewMock };
    document.getElementById = vi.fn().mockReturnValue(fakeElement);

    const getStartedBtn = screen.getByRole('button', { name: /Get Started/i });
    fireEvent.click(getStartedBtn);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
