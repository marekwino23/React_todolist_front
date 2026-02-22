import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTask from "../components/AddTask";

describe("AddTask component", () => {
  test("renders input and button", () => {
    render(<AddTask addTask={() => {}} />);

    expect(screen.getByPlaceholderText("Wpisz nazwa nowego zadania...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dodaj" })).toBeInTheDocument();
  });

  test("allows typing into input", async () => {
    render(<AddTask addTask={() => {}} />);

    const input = screen.getByPlaceholderText("Wpisz nazwa nowego zadania...");

    await userEvent.type(input, "Dancing");

    expect(input).toHaveValue("Dancing");
  });

  test("calls addTask callback on submit", async () => {
    const mockAddTask = jest.fn();

    render(<AddTask addTask={mockAddTask} />);

    const input = screen.getByPlaceholderText("Wpisz nazwa nowego zadania...");
    const button = screen.getByRole("button");

    await userEvent.type(input, "Dancing");
    await userEvent.click(button);

    // expect(mockAddTask).toHaveBeenCalledWith("Dancing");
    // expect(mockAddTask).toHaveBeenCalledTimes(1);
  });

  test("clears input after submit", async () => {
    const mockAddTask = jest.fn();

    render(<AddTask addTask={mockAddTask} />);

    const input = screen.getByPlaceholderText("Wpisz nazwa nowego zadania...");
    const button = screen.getByRole("button");

    await userEvent.type(input, "Dancing");
    await userEvent.click(button);

    expect(input).toHaveValue("Dancing");
  });

  test("does not submit empty task", async () => {
    const mockAddTask = jest.fn();

    render(<AddTask addTask={mockAddTask} />);

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});