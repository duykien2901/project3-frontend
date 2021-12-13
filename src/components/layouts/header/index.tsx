import React from "react";
import { HeaderWrapper } from "../style";
import logo from "src/assets/img/unnamed.png";
const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <div className="header-contain">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="search"></div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
