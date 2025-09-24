import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import { ComponentProps } from 'react';

// Mock the icons and Avatar component
vi.mock('lucide-react', () => ({
  Heart: () => <div data-testid="heart-icon">Heart</div>,
  Sparkles: () => <div data-testid="sparkles-icon">Sparkles</div>,
  MessageCircle: () => (
    <div data-testid="message-circle-icon">MessageCircle</div>
  ),
  Users: () => <div data-testid="users-icon">Users</div>,
  HandHeart: () => <div data-testid="hand-heart-icon">HandHeart</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
}));

vi.mock('@icons-pack/react-simple-icons', () => ({
  SiFacebook: () => <div data-testid="facebook-icon">Facebook</div>,
}));

vi.mock('@mui/material', () => {
  type AvatarProps = ComponentProps<'img'>;
  return {
    Avatar: ({ src, alt, className }: AvatarProps) => (
      <img src={src} alt={alt} className={className} data-testid="avatar" />
    ),
  };
});

// Mock the logo import
vi.mock('/logo.jpg', () => ({
  default: 'mocked-logo.jpg',
}));

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mocked-object-url');
global.URL.revokeObjectURL = vi.fn();

const mockToBlob = vi.fn((callback) => {
  setTimeout(() => {
    callback(new Blob(['test'], { type: 'image/jpeg' }));
  }, 50); // delay 50ms
});

global.HTMLCanvasElement.prototype.toBlob = mockToBlob;

// Mock Image constructor
class MockImage {
  src = '';
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  width = 800;
  height = 600;

  constructor() {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
}

global.Image = MockImage as unknown as typeof Image;

// Mock FileReader
class MockFileReader {
  result: string | ArrayBuffer | null = null;

  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null =
    null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null =
    null;

  readAsDataURL() {
    setTimeout(() => {
      this.result = 'data:image/jpeg;base64,mock-base64-data';

      // Create a ProgressEvent with correct typing
      const event = new ProgressEvent('load') as ProgressEvent<FileReader>;

      // Force its target to be `this`
      Object.defineProperty(event, 'target', {
        value: this as unknown as FileReader,
        writable: false,
      });

      // Call the handler with the right `this` context
      this.onload?.call(this as unknown as FileReader, event);
    }, 0);
  }
}

// Assign globally
global.FileReader = MockFileReader as unknown as typeof FileReader;

// Mock window.open
global.window.open = vi.fn();

// Mock alert
global.alert = vi.fn();

describe('HomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders the main homepage structure', () => {
    render(<HomePage />);

    // Check for main sections
    expect(
      screen.getByText(
        'Bringing comfort to your wardrobe, one stitch at a time.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Hi, I'm Ellie! 👋")).toBeInTheDocument();
    expect(screen.getByText('What I Create')).toBeInTheDocument();
    expect(screen.getByText('Order Request Form ✨')).toBeInTheDocument();
    expect(screen.getByText("Let's Connect 💕")).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<HomePage />);

    expect(screen.getByText('Wearable Art')).toBeInTheDocument();
    expect(screen.getByText('Personalised Gifts')).toBeInTheDocument();
    expect(screen.getByText('Custom Home Embroidery')).toBeInTheDocument();
    expect(screen.getByText('One-of-a-Kind Creations')).toBeInTheDocument();
  });

  it('handles form input changes', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const firstNameInput = screen.getByPlaceholderText('First Name*');
    const emailInput = screen.getByPlaceholderText('Email*');
    const descriptionTextarea = screen.getByPlaceholderText(
      'Project Description* - Tell me about your vision!',
    );

    await user.type(firstNameInput, 'John');
    await user.type(emailInput, 'john@example.com');
    await user.type(descriptionTextarea, 'I want a custom embroidery');

    expect(firstNameInput).toHaveValue('John');
    expect(emailInput).toHaveValue('john@example.com');
    expect(descriptionTextarea).toHaveValue('I want a custom embroidery');
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<HomePage />);

    const firstNameInput = screen.getByPlaceholderText('First Name*');
    const lastNameInput = screen.getByPlaceholderText('Last Name*');
    const emailInput = screen.getByPlaceholderText('Email*');
    const phoneInput = screen.getByPlaceholderText('Phone (optional)');
    const descriptionTextarea = screen.getByPlaceholderText(
      'Project Description* - Tell me about your vision!',
    );
    const submitButton = screen.getByText('⭐️ Submit My Order Request ⭐️');

    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '123-456-7890');
    await user.type(descriptionTextarea, 'I want a custom embroidery design');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/send', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });
  });

  it('opens social media links when clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const facebookLink = screen
      .getByText('Follow Us')
      .closest('div') as HTMLElement;
    const messengerLink = screen
      .getByText('Send a Message')
      .closest('div') as HTMLElement;
    const reviewsLink = screen
      .getByText('See My Reviews')
      .closest('div') as HTMLElement;

    await user.click(facebookLink);
    expect(global.window.open).toHaveBeenCalledWith(
      'https://www.facebook.com/profile.php?id=61580462263374',
    );

    await user.click(messengerLink);
    expect(global.window.open).toHaveBeenCalledWith(
      'https://m.me/embroiderycosycorner',
    );

    await user.click(reviewsLink);
    expect(global.window.open).toHaveBeenCalledWith(
      'https://www.facebook.com/profile.php?id=61580462263374&sk=reviews',
    );
  });

  it('scrolls to sections when navigation buttons are clicked', async () => {
    const user = userEvent.setup();
    const mockScrollIntoView = vi.fn();

    // Mock getElementById and scrollIntoView
    const mockOrderElement = { scrollIntoView: mockScrollIntoView };
    const mockServicesElement = { scrollIntoView: mockScrollIntoView };

    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'order') return mockOrderElement as unknown as HTMLElement;
      if (id === 'services')
        return mockServicesElement as unknown as HTMLElement;

      return null;
    });

    render(<HomePage />);

    const orderButton = screen.getByText('Submit Order Request ✨');
    const servicesButton = screen.getByText('Explore Services');

    await user.click(orderButton);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    await user.click(servicesButton);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
