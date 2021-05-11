import React from "react";
import { render } from "@testing-library/react";
import Message from "./";

describe("Message", () => {
  it("renders a label", () => {
    const { getByText } = render(<Message label="Hello, world!" />);

    expect(getByText("Hello, world!")).toBeInTheDocument();
  });
});
