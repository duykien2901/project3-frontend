import React, { useEffect } from "react";
import { HeaderWrapper } from "../style";
import logo from "src/assets/img/unnamed.png";
import { Badge, Dropdown, Input, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import searchIcon from "src/assets/img/notification.svg";
import UserSettingIcon from "src/assets/img/user-settings.svg";
import LogoutIcon from "src/assets/img/logout.svg";
import UserSetting from "src/components/layouts/UserSetting";
import useAccount from "src/ducks/header/account/hook";
import { useSelector } from "react-redux";
import { userSelector } from "src/ducks/user/selector";
import useUser from "src/ducks/user/hook";
import AvatarBase from "src/components/base/avatar/Avatar";
import { io } from "socket.io-client";
import { config } from "src/config";
import { socket } from "src/services/socket";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { isVisibleSetting, setIsVisibleSetting, listenSocket, removeSocket } =
    useAccount();
  const { loggedUser } = useSelector(userSelector);
  const { logout } = useUser();

  useEffect(() => {
    listenSocket();
    return function () {
      removeSocket();
    };
  }, [listenSocket, removeSocket]);

  const handle = () => {
    socket.emit("send");
  };

  const menu = (
    <Menu className="header">
      <Menu.Item
        key={"settings"}
        icon={<img src={UserSettingIcon} alt="user" className="header-menu" />}
        className="user-setting"
        onClick={() => setIsVisibleSetting(true)}
      >
        Cài đặt
      </Menu.Item>
      <Menu.Item
        key={"logout"}
        className="user-setting"
        icon={<img src={LogoutIcon} alt="logout" className="header-menu" />}
        onClick={() => logout()}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <div className="header-contain">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="search">
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="header-right">
          <div className="notification" onClick={() => handle()}>
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
                <AvatarBase user={loggedUser} size={42} />
                <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
      <UserSetting
        isVisibleSetting={isVisibleSetting}
        setIsVisibleSetting={setIsVisibleSetting}
      />
    </HeaderWrapper>
  );
};

export default Header;
