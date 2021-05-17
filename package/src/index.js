import React, { useState } from "react";
import PropTypes from "prop-types";

import useId from "@bscop/use-id";

const Tabs = React.forwardRef(
  /**
   * @param {import("./index").TabsProps} props
   * @param {React.Ref<HTMLUListElement>} ref
   */
  (props, ref) => {
    const {
      className,
      tabs,
      title,
    } = props;

    const instanceId = useId({ prefix: "tab" });

    const selectedTab = getSelectedTab(tabs);

    const [selectedTabId, setSelectedTabId] = useState(selectedTab?.id);

    if (tabs.length === 0) {
      return null;
    }

    return (
      <>
        <ul className={`ui-tabs ${className || ""}`} ref={ref} role="tablist" aria-label={title}>
          {
            tabs.map(
              (tab) => {
                const isSelected = selectedTabId === tab.id;

                const tabId = getTabUniqueId(instanceId, tab.id);

                return (
                  <li key={tab.id} role="presentation">
                    <button
                      role="tab"
                      aria-controls={tabId + "-panel"}
                      aria-selected={isSelected}
                      disabled={tab.disabled}
                      id={tabId + "-head"}
                      tabIndex={isSelected ? undefined : -1}
                    >
                      {tab.label}
                    </button>
                  </li>
                );
              }
            )
          }
        </ul>
        {
          tabs.map(
            (tab) => {
              const isSelected = selectedTabId === tab.id;

              const tabId = getTabUniqueId(instanceId, tab.id);

              return (
                <div
                  key={tab.id}
                  id={tabId + "-panel"}
                  role="tabpanel"
                  aria-expanded={isSelected || undefined}
                  aria-labelledby={tabId + "-head"}
                  hidden={!isSelected}
                >
                  {tab.renderContent(tab, props)}
                </div>
              );
            }
          )
        }
      </>
    );
  }
);

Tabs.displayName = "Tabs";

Tabs.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default Tabs;

/**
 * @name getSelectedTab
 * @param {import("./index").Tab[]} tabs
 * @returns {import("./index").Tab}
 */
const getSelectedTab =
  (tabs) => {
    const selectedTab = tabs.find(
      (tab) => {
        return tab.selected;
      }
    );

    return selectedTab || tabs[0];
  };

/**
 * @name getTabUniqueId
 * @param {string} instanceId
 * @param {string} tabId
 * @returns {string}
 */
const getTabUniqueId =
  (instanceId, tabId) => {
    return `${instanceId}-${tabId}`;
  };
