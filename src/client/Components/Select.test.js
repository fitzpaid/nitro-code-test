import {
  render,
  screen,
  fireEvent,
  within,
  getByRole,
} from "@testing-library/react";
import Select from "./Select";

const options = [
  { text: "Location", value: "location" },
  { text: "Week Posted", value: "weekOfYear" },
  { text: "Author", value: "author" },
];

const mockOnChange = jest.fn();

test("Select renders correctly and we can change options", () => {
  const component = render(
    <Select
      options={options}
      selectedOption="location"
      handleSelectionChange={mockOnChange}
    />
  );

  fireEvent.mouseDown(component.getByRole("button"));
  const listbox = within(component.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/week posted/i));

  expect(mockOnChange).toBeCalled();
});
