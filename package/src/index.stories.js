import React from "react";

import Tabs from "./";

const getSampleTabs =
  () => {
    return [
      {
        id: "one",
        label: "Tab 1",
        renderContent () {
          return (
            <div>
              <p>
                This is the content of the first tab.
              </p>
            </div>
          );
        },
      },
      {
        id: "two",
        label: "Tab 2",
        renderContent () {
          return (
            <div>
              <p>
                This is the content of the second tab.
                <br/>It also contains a link - <a href="#">this one</a> - to give the feeling it contains
                something interesting; but it does not.
              </p>
              <p>
                In fact the previous link doesn&#39;t take you anywhere - sorry.
              </p>
            </div>
          );
        },
      },
      {
        id: "three",
        label: "Tab 3",
        renderContent () {
          return (
            <div>
              <p>
                This is the content of the last tab.
                <br/>I know what you are thinking: &lsquo;This is the last interesting of the three,
                and I had also to press right arrow key once more ...&rsquo;.
              </p>
              <p>
                Well, you are right.
              </p>
            </div>
          );
        },
      },
    ];
  };

export default {
  title: "Tabs",
  component: Tabs,
};

const Template = (args) => <Tabs {...args} />;

export const SimpleTabs = Template.bind({});
SimpleTabs.args = {
  tabs: getSampleTabs(),
};
