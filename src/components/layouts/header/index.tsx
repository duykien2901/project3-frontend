import React, { useMemo } from "react";
import { HeaderWrapper } from "../style";
import logo from "src/assets/img/unnamed.png";
import { Avatar, Badge, Dropdown, Input, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import searchIcon from "src/assets/img/notification.svg";
import UserSettingIcon from "src/assets/img/user-settings.svg";
import UserSetting from "src/components/layouts/UserSetting";
import useAccount from "src/ducks/header/account/hook";

const Header: React.FC = () => {
  const { isVisibleSetting, setIsVisibleSetting } = useAccount();
  const menu = (
    <Menu className="header">
      <Menu.Item
        key={"settings"}
        icon={<img src={UserSettingIcon} alt="user" className="header-menu" />}
        className="user-setting"
      >
        Cài đặt
      </Menu.Item>
      <Menu.Item key={"logout"} className="header-menu">
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <div className="header-contain">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="search">
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="header-right">
          <div className="notification">
            <Badge count={11} showZero overflowCount={9}>
              <img src={searchIcon} alt="search" />
            </Badge>
          </div>
          <div className="avatar">
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <span>
                <Avatar src="K" size={42} className="avatar-img">
                  K
                </Avatar>
                <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
      <UserSetting isVisibleSetting={isVisibleSetting} />
    </HeaderWrapper>
  );
};

export default Header;
