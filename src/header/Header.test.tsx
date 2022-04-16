import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from "./header";

test('Header', () => {
    render(<Header/>);
    const textHeader = screen.getByRole(<p/>,  { hidden: true });
    expect(textHeader.textContent).toBe('Test Agroleague Julien NIEDZWIECKI')
})
