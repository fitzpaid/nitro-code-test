import { render, screen, fireEvent } from "@testing-library/react";
import Post from "./Post";

const postData = {
  author: "Happy User",
  location: "San Francisco",
};

const postConfig = [
  {
    id: "author",
    title: "Authored by:",
  },
  {
    id: "location",
    title: "Location:",
  },
];

test("post renders with correct content", () => {
  render(<Post data={postData} config={postConfig} />);
  expect(screen.getByText("Authored by:")).toBeInTheDOM;
  expect(screen.getByText("Happy User")).toBeInTheDOM;
  expect(screen.getByText("Location:")).toBeInTheDOM;
  expect(screen.getByText("San Francisco")).toBeInTheDOM;
});
