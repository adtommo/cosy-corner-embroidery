import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';

// Utility to wrap component with router
const renderWithRouter = (initialRoute = '/') =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="*" element={<ResponsiveAppBar />} />
      </Routes>
    </MemoryRouter>,
  );

describe('ResponsiveAppBar', () => {
  test('renders logo', () => {
    renderWithRouter();
    const logo = screen.getByAltText(/Atomic Rocket Digital Logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders desktop navigation links', () => {
    renderWithRouter();
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about us/i });
    const workLink = screen.getByRole('link', { name: /our work/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(workLink).toBeInTheDocument();
  });

  test('opens and closes mobile menu', () => {
    renderWithRouter();

    // Mobile menu button
    const menuButton = screen.getByLabelText(/open navigation menu/i);
    expect(menuButton).toBeInTheDocument();

    // Open menu
    fireEvent.click(menuButton);
    const menuItem = screen.getByRole('menuitem', { name: /about us/i });
    expect(menuItem).toBeVisible();

    // Click menu item to close
    fireEvent.click(menuItem);
    // Menu should be closed, query returns null
    expect(screen.queryByRole('menuitem', { name: /about us/i })).toBeNull();
  });

  test('navigates to correct page when desktop link is clicked', () => {
    renderWithRouter();
    const aboutLink = screen.getByRole('link', { name: /about us/i });
    expect(aboutLink).toHaveAttribute('href', '/about-us');
  });

  test('navigates to correct page when mobile link is clicked', () => {
    renderWithRouter();

    // Open mobile menu
    const menuButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(menuButton);

    const aboutMenuItem = screen.getByRole('menuitem', { name: /about us/i });
    fireEvent.click(aboutMenuItem);

    // After click, menu item should no longer exist
    expect(screen.queryByRole('menuitem', { name: /about us/i })).toBeNull();
  });
});
