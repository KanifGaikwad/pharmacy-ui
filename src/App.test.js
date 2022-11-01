import { render, screen } from '@testing-library/react';
import PharmacyApp from './PharmacyApp';

test('renders learn react link', () => {
  render(<PharmacyApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
