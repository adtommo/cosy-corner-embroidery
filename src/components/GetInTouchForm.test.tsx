import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GetInTouchForm from './GetInTouchForm';
import React from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('GetInTouchForm', () => {
  beforeEach(() => {
    render(<GetInTouchForm />);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all required fields', () => {
    const fields = [
      /first name/i,
      /last name/i,
      /email address/i,
      /phone number/i,
      /service interested in/i,
      /tell us about your project/i,
    ];

    fields.forEach((label) => {
      const input = screen.getByLabelText(label);
      expect(input).toBeInTheDocument();
    });
  });

  it('does not submit if honeypot is filled', async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as any;

    const honeyInput = document.createElement('input');
    honeyInput.setAttribute('name', 'honey');
    honeyInput.value = 'bot';
    document.body.appendChild(honeyInput);

    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);

    expect(fetchMock).not.toHaveBeenCalled();

    document.body.removeChild(honeyInput);
  });

  it('submits successfully and shows success snackbar', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ result: 'success' }),
    });
    global.fetch = fetchMock as any;

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/tell us about your project/i), {
      target: { value: 'Hello' },
    });

    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      const successSnackbar = screen.getByText(
        /thank you! your message has been sent successfully/i,
      );
      expect(successSnackbar).toBeInTheDocument();
    });
  });

  it('shows overlay while submitting', async () => {
    const fetchMock = vi
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ json: async () => ({ result: 'success' }) }),
              100,
            ),
          ),
      );
    global.fetch = fetchMock as any;

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/tell us about your project/i), {
      target: { value: 'Hello' },
    });

    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);

    // Wait for overlay to appear
    await waitFor(() => {
      const overlay = screen.getByTestId('loading-overlay');
      expect(overlay).toBeInTheDocument();
    });
  });

  it('shows error snackbar on failed submission', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ result: 'error' }),
    });
    global.fetch = fetchMock as any;

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/tell us about your project/i), {
      target: { value: 'Hello' },
    });

    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorSnackbar = screen.getByText(/oops! something went wrong/i);
      expect(errorSnackbar).toBeInTheDocument();
    });
  });
});
