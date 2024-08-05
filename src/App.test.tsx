import { render, screen } from '@testing-library/react';
import { App } from './App';

// this can be removed
test('renders welcome text', () => {
  render(<App />);
  const welcome = screen.getByText(/Replace me/i);
  expect(welcome).toBeInTheDocument();
});
