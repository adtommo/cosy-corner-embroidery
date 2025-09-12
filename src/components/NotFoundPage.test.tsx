import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { vi } from 'vitest';

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the 404 heading and main message', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/Houston, we have a problem!/i);
    expect(heading).toBeInTheDocument();

    const subheading = screen.getByText(
      /The page you're looking for seems to have launched into orbit/i,
    );
    expect(subheading).toBeInTheDocument();
  });

  it('renders the 404 large background number', () => {
    render(<NotFoundPage />);
    const number404 = screen.getByText('404');
    expect(number404).toBeInTheDocument();
  });

  it('renders the Go Back button', () => {
    render(<NotFoundPage />);
    const goBackBtn = screen.getByRole('button', { name: /Go Back/i });
    expect(goBackBtn).toBeInTheDocument();
  });

  it('calls window.history.back when Go Back button is clicked', () => {
    const backSpy = vi
      .spyOn(window.history, 'back')
      .mockImplementation(() => {});
    render(<NotFoundPage />);

    const goBackBtn = screen.getByRole('button', { name: /Go Back/i });
    fireEvent.click(goBackBtn);

    expect(backSpy).toHaveBeenCalled();
  });

  it('renders floating background elements', () => {
    render(<NotFoundPage />);
    // There should be 3 floating elements
    const floatingElements = screen.getAllByRole('presentation');
    expect(floatingElements.length).toBe(3);
  });
});
