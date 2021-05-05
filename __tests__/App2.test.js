import { render, screen } from '@testing-library/react'
import App from '@/src/App'

test('renders learn react link 2', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
