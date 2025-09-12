import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import PricingSection from './PricingSection';

describe('PricingSection', () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <PricingSection />
      </HelmetProvider>,
    );
  });

  it('renders the main heading and subheading', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: /our plans/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/each project is unique/i)).toBeInTheDocument();
    expect(
      screen.getByText(/if you prefer to host the site yourself/i),
    ).toBeInTheDocument();
  });

  it('renders all plan cards', () => {
    const planNames = ['Basic', 'Standard', 'Ultimate'];

    planNames.forEach((name) => {
      const card = screen.getByTestId(`plan-card-${name.toLowerCase()}`);
      expect(card).toHaveTextContent(new RegExp(name, 'i'));
    });
  });

  it('renders features for each plan', () => {
    expect(screen.getByText(/domain setup/i)).toBeInTheDocument();
    expect(
      screen.getByText(/custom design - up to 20 pages/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/advanced workflow automations/i),
    ).toBeInTheDocument();
  });

  it('renders setup fees and prices', () => {
    // Use getAllByText when multiple matches exist
    expect(screen.getAllByText(/£40/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/£200 setup fee/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/£65/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/£400 setup fee/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/£120/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/£800 setup fee/i).length).toBeGreaterThan(0);
  });
});
