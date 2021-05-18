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

    if (tabs.length === 0) {
      return null;
    }

    /**
     * @name onKeyDown
     * @param {React.KeyboardEvent} event
     */
    const onKeyDown =
      (event) => {
        /**
         * FIXME: Check the next/prev tab isn't disabled; otherwise skip it.
         */
        switch (event.key){
          case "ArrowLeft":
            if (selectedTabIndex > 0) {
              setSelectedTabIndex(selectedTabIndex - 1);
            }
            break;
          case "ArrowRight":
            if (selectedTabIndex < tabs.length - 1) {
              setSelectedTabIndex(selectedTabIndex + 1);
            }
            break;
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

    return Math.max(0, tabIndex);
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
