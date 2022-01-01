import {
  EllipsisOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel, Dropdown, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useMemo, useState } from "react";
import { User } from "src/ducks/user";
import { PostDetailWrapper } from "./style";

const PostDetai: React.FC<{ loggedUser: User | null }> = ({ loggedUser }) => {
  const [arrow, setArrow] = useState({ l: true, r: true });
  const menu = useMemo(() => {
    return (
      <Menu className="header">
        <Menu.Item
          key={"settings"}
          // icon={
          //   <img src={UserSettingIcon} alt="user" className="header-menu" />
          // }
          className="user-setting"
          // onClick={() => setIsVisibleSetting(true)}
        >
          Cài đặt
        </Menu.Item>
        <Menu.Item
          key={"logout"}
          className="user-setting"
          // icon={<img src={LogoutIcon} alt="logout" className="header-menu" />}
          // onClick={() => logout()}
        >
          Đăng xuất
        </Menu.Item>
      </Menu>
    );
  }, []);
  return (
    <PostDetailWrapper>
      <div className="title">
        <div className="author">
          <span className="avatar">
            <Avatar src={loggedUser?.profileImage} size={50}>
              {loggedUser?.name.charAt(0).toUpperCase()}
            </Avatar>
          </span>
          <div className="auth-name">
            <div className="name">{loggedUser?.name}</div>
            <div className="time">
              1234 <span>che do</span>
            </div>
          </div>
        </div>

        <div className="edit-btn">
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <div className="icon-edit">
              <EllipsisOutlined size={60} />
            </div>
          </Dropdown>
        </div>
      </div>

      <div className="content">
        abc abd <LeftOutlined />
      </div>
      <div className="img-content">
        <Carousel
          slidesToShow={1}
          dots={false}
          infinite={false}
          arrows={true}
          nextArrow={<RightOutlined />}
          prevArrow={<LeftOutlined />}
        >
          <img
            src="https://anphat.com.vn/media/product/28891_dareu_ek87_multi_led__1_.jpg"
            alt=""
          />
          <img
            src="https://anphat.com.vn/media/product/28891_dareu_ek87_multi_led__1_.jpg"
            alt=""
          />
        </Carousel>
      </div>
    </PostDetailWrapper>
  );
};

export default PostDetai;
