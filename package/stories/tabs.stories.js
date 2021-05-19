import React from "react";

import Tabs from "../src";

const getSampleTabs =
  () => {
    return [
      {
        id: "tab-1",
        label: "Section 1",
        renderContent () {
          return (
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, tortor nec
                pharetra ultricies, ante erat imperdiet velit, nec laoreet enim lacus a velit. <a href="#">
                Nam luctus</a>, enim in interdum condimentum, nisl diam iaculis lorem, vel volutpat
                mi leo sit amet lectus. Praesent non odio bibendum magna bibendum accumsan.
              </p>
            </div>
          );
        },
      },
      {
        id: "tab-2",
        label: "Section 2",
        renderContent () {
          return (
            <div>
              <p>
                Nullam at diam nec arcu suscipit auctor non a erat. Sed et magna semper, eleifend
                magna non, facilisis nisl. Proin et est et lorem dictum finibus ut nec turpis.
                Aenean nisi tortor, euismod a mauris a, mattis scelerisque tortor. Sed dolor risus,
                varius a nibh id, condimentum lacinia est. In lacinia cursus odio a aliquam. Curabitur
                tortor magna, laoreet ut rhoncus at, sodales consequat tellus.
              </p>
            </div>
          );
        },
      },
      {
        id: "tab-3",
        label: "Section 3",
        renderContent () {
          return (
            <div>
              <p>
                Phasellus ac tristique orci. Nulla maximus <a href="">justo nec dignissim consequat</a>.
                Sed vehicula diam sit amet mi efficitur vehicula in in nisl. Aliquam erat volutpat.
                Suspendisse lorem turpis, accumsan consequat consectetur gravida, <a href="#">pellentesque
                ac ante</a>. Aliquam in commodo ligula, sit amet mollis neque. Vestibulum at facilisis massa.
              </p>
            </div>
          );
        },
      },
      {
        id: "tab-4",
        label: "Section 4",
        renderContent () {
          return (
            <div>
              <p>
                Nam luctus, enim in interdum condimentum, nisl diam iaculis lorem, vel volutpat mi leo
                sit amet lectus. Praesent non odio bibendum magna bibendum accumsan. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Nam euismod, tortor nec pharetra ultricies, ante
                erat imperdiet velit, nec laoreet enim lacus a velit.
              </p>
            </div>
          );
        },
      },
    ];
  };

const Template = (args) => <Tabs {...args} />;

export default {
  title: "Tabs",
  component: Tabs,
};

export const SimpleTabs = Template.bind({});

SimpleTabs.args = {
  tabs: getSampleTabs(),
  title: "Demo",
};

export const DisabledTabs = Template.bind({});

DisabledTabs.args = {
  tabs: getSampleTabs()
    .map(
      (tab, i) => {
        return {
          ...tab,
          disabled: i < 2,
        };
      }
    ),
  title: "Demo",
};
