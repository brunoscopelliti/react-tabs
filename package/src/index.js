import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import useDidUpdate from "@bscop/use-did-update";
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

    const [selectedTabIndex, setSelectedTabIndex] = useState(
      getSelectedTabIndex(tabs)
    );

    const refActiveTab = useRef(null);

    useDidUpdate(
      () => {
        if (refActiveTab.current) {
          refActiveTab.current.focus();
        }
      },
      [selectedTabIndex]
    );

    /**
     * When it's not possible to determine a selected tab
     * it renders nothing;
     * This usually happens when:
     *  - `tabs` is empty array, or
     *  - it contains only disabled tabs
     */
    if (selectedTabIndex < 0) {
      return null;
    }

    /**
     * @name onKeyDown
     * @param {React.KeyboardEvent} event
     */
    const onKeyDown =
      (event) => {
        let tabIndex;

        switch (event.key){
          case "ArrowLeft":
            tabIndex = getPrevSelectableTabIndex(tabs, selectedTabIndex);
            break;
          case "ArrowRight":
            tabIndex = getNextSelectableTabIndex(tabs, selectedTabIndex);
            break;
        }

        if (tabIndex >= 0) {
          setSelectedTabIndex(tabIndex);
        }
      };

    return (
      <>
        <ul className={`ui-tabs ${className || ""}`} ref={ref} role="tablist" aria-label={title}>
          {
            tabs.map(
              (tab, tabIndex) => {
                const isSelected = selectedTabIndex === tabIndex;

                const tabId = getTabUniqueId(instanceId, tab.id);

                const propsButton = isSelected
                  ? {
                      onKeyDown,
                      ref: refActiveTab,
                    }
                  : {
                      tabIndex: -1,
                    };

                return (
                  <li key={tab.id} role="presentation">
                    <button
                      {...propsButton}
                      role="tab"
                      aria-controls={tabId + "-panel"}
                      aria-selected={isSelected}
                      disabled={tab.disabled}
                      id={tabId + "-head"}
                      onClick={
                        () => {
                          setSelectedTabIndex(tabIndex);
                        }
                      }
                      type="button"
                    >
                      {
                        typeof tab.renderHead == "function"
                          ? tab.renderHead(tab, props)
                          : tab.label
                      }
                    </button>
                  </li>
                );
              }
            )
          }
        </ul>
        {
          tabs.map(
            (tab, tabIndex) => {
              const isSelected = selectedTabIndex === tabIndex;

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
 * @name getSelectableTab
 * @param {import("./index").Tab[]} tabs
 * @param {Function} getTabIndex
 * @returns {number}
 */
const getSelectableTab =
  (tabs, getTabIndex) => {
    let tab, tabIndex;
    while (tab = tabs[tabIndex = getTabIndex(tabIndex)]) {
      if (!tab.disabled) {
        return tabIndex;
      }
    }
    return -1;
  };

/**
 * Returns the position of the selected tab.
 * When there's no selected tab,
 * we assume the first tab is visible.
 * @name getSelectedTabIndex
 * @param {import("./index").Tab[]} tabs
 * @returns {number}
 */
const getSelectedTabIndex =
  (tabs) => {
    const tabIndex = tabs.findIndex(
      (tab) => {
        return tab.selected;
      }
    );

    if (tabIndex >= 0) {
      return tabIndex;
    }

    return getSelectableTab(tabs, (tabIndex = -1) => tabIndex + 1);
  };

/**
 * @name getPrevSelectableTabIndex
 * @param {import("./index").Tab[]} tabs
 * @param {number} startIndex
 * @returns {number}
 */
const getPrevSelectableTabIndex =
  (tabs, startIndex) => {
    return getSelectableTab(tabs,
      (tabIndex = startIndex) => tabIndex - 1);
  };

/**
 * @name getNextSelectableTabIndex
 * @param {import("./index").Tab[]} tabs
 * @param {number} startIndex
 * @returns {number}
 */
const getNextSelectableTabIndex =
  (tabs, startIndex) => {
    return getSelectableTab(tabs,
      (tabIndex = startIndex) => tabIndex + 1);
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
