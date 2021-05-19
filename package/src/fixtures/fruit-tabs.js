import React from "react";

const getTabs =
  () => [
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
  ];

export default getTabs;
