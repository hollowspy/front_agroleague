import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from "./header";
//

test('renders react component', () => {
    render(<Header />);
    const pElement = screen.getByText(/Test Agroleague Julien NIEDZWIECKI/i);
    expect(pElement).toBeInTheDocument();
});
