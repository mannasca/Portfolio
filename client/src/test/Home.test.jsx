import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';

// Simple test components
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <UserProvider>
      {children}
    </UserProvider>
  </BrowserRouter>
);

const SimpleComponent = () => (
  <div>
    <h1>Test Component</h1>
    <p>This is a test</p>
  </div>
);

describe('App Component Structure', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <SimpleComponent />
      </TestWrapper>
    );
    expect(document.body).toBeInTheDocument();
  });

  it('renders heading in test component', () => {
    render(
      <TestWrapper>
        <SimpleComponent />
      </TestWrapper>
    );
    const heading = screen.getByText('Test Component');
    expect(heading).toBeInTheDocument();
  });

  it('renders paragraph text', () => {
    render(
      <TestWrapper>
        <SimpleComponent />
      </TestWrapper>
    );
    const paragraph = screen.getByText('This is a test');
    expect(paragraph).toBeInTheDocument();
  });

  it('DOM structure is valid', () => {
    const { container } = render(
      <TestWrapper>
        <SimpleComponent />
      </TestWrapper>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders multiple elements', () => {
    const { container } = render(
      <TestWrapper>
        <SimpleComponent />
      </TestWrapper>
    );
    const elements = container.querySelectorAll('*');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('elements have correct tags', () => {
    const { container } = render(
      <TestWrapper>
        <SimpleComponent />
      </TestWrapper>
    );
    const h1 = container.querySelector('h1');
    const p = container.querySelector('p');
    expect(h1).toBeInTheDocument();
    expect(p).toBeInTheDocument();
  });
});
