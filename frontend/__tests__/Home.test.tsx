import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home component', () => {
  it('renders welcome message and dashboard link', () => {
    render(<Home />);

    // Check for welcome message
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to the Dashboard Project');

    // Check for dashboard link
    const link = screen.getByRole('link', { name: /go to dashboard/i });
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});