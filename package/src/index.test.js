import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import getTabs from "./fixtures/fruit-tabs";
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

  it("renders nothing when no selectable tabs", () => {
    render(
      <Tabs
        tabs={
          getTabs()
            .map(
              (tab) => {
                return {
                  ...tab,
                  disabled: true,
                };
              }
            )
        }
        title="Fruit details"
      />
    );

    const tablist = screen.queryByLabelText("Fruit details");

    expect(tablist).not.toBeInTheDocument();
  });

  it("renders tabs", () => {
    render(
      <Tabs
        tabs={getTabs()}
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

  it("renders tabs / first is disabled", () => {
    render(
      <Tabs
        tabs={
          getTabs()
            .map(
              (tab, tabIndex) => {
                return {
                  ...tab,
                  disabled: tabIndex === 0,
                };
              }
            )
        }
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
      "aria-selected": "false",
      disabled: "",
      id: "tab-a-head",
      tabIndex: "-1",
    });

    expectAttributes(tabHeadings[1], {
      "aria-controls": "tab-b-panel",
      "aria-selected": "true",
      id: "tab-b-head",
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
      "aria-labelledby": "tab-a-head",
      hidden: "",
      id: "tab-a-panel",
    });

    expectAttributes(tabPanels[1], {
      "aria-expanded": "true",
      "aria-labelledby": "tab-b-head",
      id: "tab-b-panel",
    });

    expectAttributes(tabPanels[2], {
      "aria-labelledby": "tab-c-head",
      hidden: "",
      id: "tab-c-panel",
    });
  });

  it("renders tabs / second is selected", () => {
    render(
      <Tabs
        tabs={
          getTabs()
            .map(
              (tab, tabIndex) => {
                return {
                  ...tab,
                  selected: tabIndex === 1,
                };
              }
            )
        }
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
      "aria-selected": "false",
      id: "tab-a-head",
      tabIndex: "-1",
    });

    expectAttributes(tabHeadings[1], {
      "aria-controls": "tab-b-panel",
      "aria-selected": "true",
      id: "tab-b-head",
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
      "aria-labelledby": "tab-a-head",
      hidden: "",
      id: "tab-a-panel",
    });

    expectAttributes(tabPanels[1], {
      "aria-expanded": "true",
      "aria-labelledby": "tab-b-head",
      id: "tab-b-panel",
    });

    expectAttributes(tabPanels[2], {
      "aria-labelledby": "tab-c-head",
      hidden: "",
      id: "tab-c-panel",
    });
  });

  it("renders tabs / custom headings", () => {
    render(
      <Tabs
        tabs={
          getTabs()
            .map(
              (tab, tabIndex) => {
                return {
                  ...tab,
                  renderHead (tab) {
                    return (
                      <span data-testid="custom-head">{tab.label}</span>
                    );
                  },
                };
              }
            )
        }
        title="Fruit details"
      />
    );

    const tablist = screen.getByRole("tablist");

    expect(tablist).toBeInTheDocument();

    expect(tablist).toHaveAttribute("aria-label", "Fruit details");

    const tabHeadings = screen.getAllByTestId("custom-head");

    expect(tabHeadings).toHaveLength(3);
  });

  it("permits to change the visible tab panel by clicking on the corresponding header", () => {
    render(
      <Tabs
        tabs={getTabs()}
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

  it("doesn't change visible tab panel when clicking on disabled tab header", () => {
    render(
      <Tabs
        tabs={
          getTabs()
            .map(
              (tab, tabIndex) => {
                return {
                  ...tab,
                  disabled: tabIndex === 1,
                };
              }
            )
        }
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

    expect(tabHeadings[0]).toHaveAttribute("aria-selected", "true");

    expect(tabHeadings[1]).toHaveAttribute("aria-selected", "false");

    expect(tabPanels[0]).toHaveAttribute("aria-expanded", "true");

    expect(tabPanels[1]).toHaveAttribute("hidden", "");
  });

  it("permits to change the visible tab panel by pressing arrow keys", () => {
    render(
      <Tabs
        tabs={getTabs()}
        title="Fruit details"
      />
    );

    const tabHeadings = screen.getAllByRole("tab");

    const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });

    fireEvent.keyDown(tabHeadings[0], { key: "ArrowRight" });

    expect(tabHeadings[0]).toHaveAttribute("aria-selected", "false");

    expect(tabHeadings[1]).toHaveAttribute("aria-selected", "true");

    expect(tabPanels[0]).toHaveAttribute("hidden", "");

    expect(tabPanels[1]).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(tabHeadings[1], { key: "ArrowLeft" });

    expect(tabHeadings[0]).toHaveAttribute("aria-selected", "true");

    expect(tabHeadings[1]).toHaveAttribute("aria-selected", "false");

    expect(tabPanels[0]).toHaveAttribute("aria-expanded", "true");

    expect(tabPanels[1]).toHaveAttribute("hidden", "");
  });

  it("permits to change the visible tab panel by pressing arrow keys / disabled tabs get skipped", () => {
    render(
      <Tabs
        tabs={
          getTabs()
            .map(
              (tab, tabIndex) => {
                return {
                  ...tab,
                  disabled: tabIndex === 1,
                };
              }
            )
        }
        title="Fruit details"
      />
    );

    const tabHeadings = screen.getAllByRole("tab");

    const tabPanels = screen.getAllByRole("tabpanel", { hidden: true });

    fireEvent.keyDown(tabHeadings[0], { key: "ArrowRight" });

    expect(tabHeadings[0]).toHaveAttribute("aria-selected", "false");

    expect(tabHeadings[2]).toHaveAttribute("aria-selected", "true");

    expect(tabPanels[0]).toHaveAttribute("hidden", "");

    expect(tabPanels[2]).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(tabHeadings[2], { key: "ArrowLeft" });

    expect(tabHeadings[0]).toHaveAttribute("aria-selected", "true");

    expect(tabHeadings[2]).toHaveAttribute("aria-selected", "false");

    expect(tabPanels[0]).toHaveAttribute("aria-expanded", "true");

    expect(tabPanels[2]).toHaveAttribute("hidden", "");
  });
});
