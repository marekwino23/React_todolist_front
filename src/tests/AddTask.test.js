import AddTask from '../components/AddTask'
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

describe('AddTask', () => {
    it("renders properly", async() => {
        render(<AddTask/>);
        expect(screen.getByLabelText('add task')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
        
    it("should enter a new task name when type in textbox and called onChange callback", async () => {
        render(<AddTask/>);
        const textBox = screen.getByLabelText('add task');
        const button = screen.getByRole('button');
        fireEvent.change(textBox, {
        target: {
            value: "Dancing"
            }
        });

        fireEvent.click(button);
        
        expect(textBox.value).toEqual(
            'Dancing'
        );
    });
});