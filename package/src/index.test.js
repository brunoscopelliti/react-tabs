import React from "react";
import { render } from "@testing-library/react";
import Message from "./";

describe("Message", () => {
  it("renders a label", () => {
    const { debug, getByText } = render(<Message label="Hello, world!" />);

    debug();

    expect(getByText("Hello, world!")).toBeInTheDocument();
  });
});
