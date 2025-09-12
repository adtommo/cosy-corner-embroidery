import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CookieConsent from './CookieConsent';
import '@testing-library/jest-dom';

const COOKIE_KEY = 'cookiesAccepted';

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the banner if cookies not accepted', () => {
    render(<CookieConsent />);
    const banner = screen.getByRole('alertdialog', { name: /cookie consent/i });
    expect(banner).toBeInTheDocument();
  });

  it('does not render the banner if cookies already accepted', () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    render(<CookieConsent />);
    const banner = screen.queryByRole('alertdialog', {
      name: /cookie consent/i,
    });
    expect(banner).not.toBeInTheDocument();
  });

  it('hides the banner when accepted and sets localStorage', async () => {
    render(<CookieConsent />);

    const acceptButton = screen.getByRole('button', { name: /accept/i });
    fireEvent.click(acceptButton);

    expect(localStorage.getItem(COOKIE_KEY)).toBe('true');

    // Wait for the banner to be removed after slide animation
    await waitFor(() => {
      const banner = screen.queryByRole('alertdialog', {
        name: /cookie consent/i,
      });
      expect(banner).not.toBeInTheDocument();
    });
  });

  it('renders links to Privacy Policy and Terms & Conditions', () => {
    render(<CookieConsent />);
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    const termsLink = screen.getByRole('link', { name: /terms & conditions/i });

    expect(privacyLink).toHaveAttribute('href', '/privacy');
    expect(termsLink).toHaveAttribute('href', '/terms');
  });
});
