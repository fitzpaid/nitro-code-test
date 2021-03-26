import { render, screen, fireEvent } from "@testing-library/react";
import TreeView from "./TreeView";

const data = [
  [
    "location",
    [
      {
        author: "happy user",
        location: "San Francisco",
      },
      {
        author: "happy manager",
        location: "San Francisco",
      },
    ],
  ],
];

test("tree view renders with correct content", () => {
  render(
    <TreeView
      data={data}
      renderLeafContent={(content) => {
        return content.map((c) => (
          <div key={c.author}>
            <div>{c.author}</div>)
          </div>
        ));
      }}
    />
  );
  expect(screen.getByText(/happy user/)).toBeInTheDOM;
  expect(screen.getByText(/happy manager/)).toBeInTheDOM;
});
