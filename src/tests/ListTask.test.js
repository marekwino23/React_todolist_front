import ListTask from '../components/ListTask'
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

describe('ListTask', () => {
    it("renders properly", async() => {
        render(<ListTask/>);
        expect(screen.getByText('List of task')).toBeInTheDocument();
        expect(screen.getByLabelText('stop alarm')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
});