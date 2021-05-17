import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tabs from "./";

const hasOwn = {}.hasOwnProperty;

describe("Tabs", () => {
  it("renders nothing when no tabs", () => {
    render(
      <Tabs
        tabs={[]}
        title="Fruit details"
      />
    );

    const tablist = screen.queryByLabelText("Fruit details");

    expect(tablist).not.toBeInTheDocument();
  });

  it("renders tabs", () => {
    render(
      <Tabs
        tabs={[
          {
            id: "a",
            label: "Apple",
            renderContent () {
              return (
                <div>
                  <p>Content for Apple tab.</p>
                </div>
              );
            },
          },
          {
            id: "b",
            label: "Banana",
            renderContent () {
              return (
                <div>
                  <p>Content for Banana tab.</p>
                </div>
              );
            },
          },
          {
            id: "c",
            label: "Cherry",
            renderContent () {
              return (
                <div>
                  <p>Content for Cherry tab.</p>
                </div>
              );
            },
          },
        ]}
        title="Fruit details"
      />
    );

    const tablist = screen.getByRole("tablist");

    expect(tablist).toBeInTheDocument();

    expect(tablist).toHaveAttribute("aria-label", "Fruit details");

    const tabHeadings = screen.getAllByRole("tab");

    expect(tabHeadings).toHaveLength(3);

    const expectAttributes =
      (tab, attributes) => {
        for (const k in attributes) {
          if (hasOwn.call(attributes, k)) {
            expect(tab).toHaveAttribute(k, attributes[k]); // eslint-disable-line jest/no-conditional-expect
          }
        }
      };

    expectAttributes(tabHeadings[0], {
      "aria-controls": "tab-a-panel",
      "aria-selected": "true",
      id: "tab-a-head",
    });

    expectAttributes(tabHeadings[1], {
      "aria-controls": "tab-b-panel",
      "aria-selected": "false",
      id: "tab-b-head",
      tabIndex: "-1",
    });

    expectAttributes(tabHeadings[2], {
      "aria-controls": "tab-c-panel",
      "aria-selected": "false",
      id: "tab-c-head",
      tabIndex: "-1",
    });

    const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });

    expect(tabPanels).toHaveLength(3);

    expectAttributes(tabPanels[0], {
      "aria-expanded": "true",
      "aria-labelledby": "tab-a-head",
      id: "tab-a-panel",
    });

    expectAttributes(tabPanels[1], {
      "aria-labelledby": "tab-b-head",
      hidden: "",
      id: "tab-b-panel",
    });

    expectAttributes(tabPanels[2], {
      "aria-labelledby": "tab-c-head",
      hidden: "",
      id: "tab-c-panel",
    });
  });

  it("permits to change the visible tab panel by clicking on the corresponding header", () => {
    render(
      <Tabs
        tabs={[
          {
            id: "a",
            label: "Apple",
            renderContent () {
              return (
                <div>
                  <p>Content for Apple tab.</p>
                </div>
              );
            },
          },
          {
            id: "b",
            label: "Banana",
            renderContent () {
              return (
                <div>
                  <p>Content for Banana tab.</p>
                </div>
              );
            },
          },
        ]}
        title="Fruit details"
      />
    );

    const tabHeadings = screen.getAllByRole("tab");

    expect(tabHeadings[0]).toHaveAttribute("aria-selected", "true");

    expect(tabHeadings[1]).toHaveAttribute("aria-selected", "false");

    const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });

    expect(tabPanels[0]).toHaveAttribute("aria-expanded", "true");

    expect(tabPanels[1]).toHaveAttribute("hidden", "");

    userEvent.click(tabHeadings[1]);

    expect(tabHeadings[0]).toHaveAttribute("aria-selected", "false");

    expect(tabHeadings[1]).toHaveAttribute("aria-selected", "true");

    expect(tabPanels[0]).toHaveAttribute("hidden", "");

    expect(tabPanels[1]).toHaveAttribute("aria-expanded", "true");
  });
});
