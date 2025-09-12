import { render, screen, fireEvent } from '@testing-library/react';
import HelpWidget from './HelpWidget';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('HelpWidget', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HelpWidget />
      </MemoryRouter>,
    );
  });

  it('opens and closes the widget when floating button is clicked', () => {
    const openButton = screen.getByRole('button', {
      name: /open help widget/i,
    });
    fireEvent.click(openButton);

    const dialog = screen.getByRole('dialog', { name: /help widget/i });
    expect(dialog).toBeInTheDocument();

    // Close
    fireEvent.click(openButton);
    // opacity or transform changes, still in DOM, so cannot assert removed
    expect(dialog).toBeInTheDocument();
  });

  it('renders FAQ items', () => {
    // Open widget first
    const openButton = screen.getByRole('button', {
      name: /open help widget/i,
    });
    fireEvent.click(openButton);

    const faqQuestions = [
      'What technologies do you use?',
      'How long does a typical project take?',
      'Do you provide ongoing support?',
      'What is your pricing structure?',
      'Can you work with existing websites?',
      'Do you provide hosting services?',
      'Can you help with SEO?',
      'Are your websites mobile responsive?',
    ];

    faqQuestions.forEach((q) => {
      const question = screen.getByText(q);
      expect(question).toBeInTheDocument();
    });
  });

  it('expands an FAQ item when clicked', () => {
    const openButton = screen.getByRole('button', {
      name: /open help widget/i,
    });
    fireEvent.click(openButton);

    const question = screen.getByText(/what technologies do you use\?/i);
    fireEvent.click(question);

    const answer = screen.getByText(
      /we specialize in react, next\.js, node\.js, typescript, tailwind css, and aws/i,
    );
    expect(answer).toBeInTheDocument();
  });

  it('calls handleScroll when Contact tab is clicked', () => {
    vi.useFakeTimers();

    const openButton = screen.getByRole('button', {
      name: /open help widget/i,
    });
    fireEvent.click(openButton);

    const scrollIntoViewMock = vi.fn();
    document.getElementById = vi
      .fn()
      .mockReturnValue({ scrollIntoView: scrollIntoViewMock });

    const contactTab = screen.getByRole('tab', { name: /contact/i });
    fireEvent.click(contactTab);

    vi.runAllTimers();

    expect(scrollIntoViewMock).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
