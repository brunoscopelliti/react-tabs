import React from "react";

export type Tab = {
  disabled ?: boolean;
  id : string;
  label : string;
  renderContent : (tab : Tab, props: TabsProps) => React.ReactNode
  renderHead ?: (tab : Tab, props: TabsProps) => React.ReactNode
  selected ?: boolean;
};

export type TabsProps = {
  className ?: string;
  tabs : Tab[];
  title : string;
};

declare const Tabs : React.ForwardRefRenderFunction<HTMLUListElement, TabsProps>;

export default Tabs;
