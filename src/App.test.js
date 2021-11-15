import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  expect(getByText(/We now have Auth!/i)).toBeInTheDocument();
});
