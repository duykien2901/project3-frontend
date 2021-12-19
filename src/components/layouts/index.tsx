import React from "react";
import Header from "./header";
import { LayoutWrapper } from "./style";

const Layout: React.FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
