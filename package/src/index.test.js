import React from "react";
import { render, screen } from "@testing-library/react";

import Tabs from "./";

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
              )
            }
          },
          {
            id: "b",
            label: "Banana",
            renderContent () {
              return (
                <div>
                  <p>Content for Banana tab.</p>
                </div>
              )
            }
          },
          {
            id: "c",
            label: "Cherry",
            renderContent () {
              return (
                <div>
                  <p>Content for Cherry tab.</p>
                </div>
              )
            }
          }
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
          if (attributes.hasOwnProperty(k)) {
            expect(tab).toHaveAttribute(k, attributes[k]);
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
});
