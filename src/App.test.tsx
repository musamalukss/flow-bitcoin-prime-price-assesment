import { cleanup, render, screen } from '@testing-library/react';
import App from './App';



afterEach(cleanup)
test('renders app container with components', () => {
  render(<App />);
  const HeadingElement = screen.getByText("Bitcoin Price");
  expect(HeadingElement).toBeInTheDocument();
});


