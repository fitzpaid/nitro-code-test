import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

const formMap = {
  author: { value: "Author Name", label: "Author" },
};

test("component renders input when map provided", () => {
  render(<Form inputsMap={formMap} />);
  expect(screen.getByText("Author")).toBeInTheDOM;
  expect(screen.getByDisplayValue("Author Name")).toBeInTheDOM;
});

test("component calls submit callback when add post pressed", () => {
  const submitMock = jest.fn();
  render(<Form inputsMap={formMap} handleSubmit={submitMock} />);
  fireEvent.click(screen.getByText("Update Post"));
  expect(submitMock).toBeCalled();
});
