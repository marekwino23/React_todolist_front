import ListTask from '../components/ListTask'
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
 describe("ListTask component", () => {
    test("renders loading state initially", () => {
    render(<ListTask />);
    
    // loading text powinien być widoczny
    expect(screen.getByText(/Ładowanie zadań.../i)).toBeInTheDocument();

    // listitemów jeszcze nie ma
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});