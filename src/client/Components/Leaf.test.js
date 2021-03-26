import { render, screen } from "@testing-library/react";
import Leaf from "./Leaf";

test("leaf renders with correct content", () => {
  render(
    <Leaf
      leafName={"Test Leaf"}
      renderContent={() => {
        return <div>This content has been rendered</div>;
      }}
    />
  );
  expect(screen.getByText("Test Leaf")).toBeInTheDOM;
  expect(screen.getByText("This content has been rendered")).toBeInTheDOM;
});
