import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('component Header is inside App component', () => {
    render(<App />);
    const header = screen.getByText(/Test Agroleague Julien NIEDZWIECKI/i)
    expect(header).toBeInTheDocument();
    
})
