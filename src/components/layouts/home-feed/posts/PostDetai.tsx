import {
  EllipsisOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel, Dropdown, Image, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Post } from "src/ducks/home/post";
import { User } from "src/ducks/user";
import { formatDate } from "src/libs/helpers/utils/formatDate";
import { PostDetailWrapper } from "./style";
import publicIcon from "src/assets/img/globalMode.svg";
import friendIcon from "src/assets/img/friendMode.svg";
import privateIcon from "src/assets/img/privateMode.svg";
import { MODE_HIDE } from "src/constants/commom.constant";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { MentionSearch } from "src/ducks/home/post/mentions/hook";
import { Link } from "react-router-dom";
import isUrl from "src/libs/helpers/utils/url";

export type PostDetail = {
  loggedUser: User | null;
  postDetail: Post;
};

const PostDetai: React.FC<PostDetail> = ({ loggedUser, postDetail }) => {
  const [arrow, setArrow] = useState({ l: false, r: false });
  const { owner, images } = postDetail;
  const [linkPreview, setLinkPreview] = useState("");

  useEffect(() => {
    postDetail.images.length > 0 && setArrow({ l: false, r: true });
  }, [postDetail.images]);

  const menu = useMemo(() => {
    return (
      <Menu className="header">
        <Menu.Item
          key={"edit"}
          // icon={
          //   <img src={UserSettingIcon} alt="user" className="header-menu" />
          // }
          className="user-setting"
          // onClick={() => setIsVisibleSetting(true)}
        >
          Xóa bài viết
        </Menu.Item>
        <Menu.Item
          key={"logout"}
          className="user-setting"
          // icon={<img src={LogoutIcon} alt="logout" className="header-menu" />}
          // onClick={() => logout()}
        >
          Sửa bài viết
        </Menu.Item>
      </Menu>
    );
  }, []);

  const typeMode = useCallback((type: number) => {
    const { PRIVATE, FRIEND } = MODE_HIDE;
    switch (type) {
      case FRIEND.value:
        return <img src={friendIcon} alt="" />;
      case PRIVATE.value:
        return <img src={privateIcon} alt="" />;
      default:
        return <img src={publicIcon} alt="" />;
    }
  }, []);

  const handleChangeSlide = useCallback(
    (current: number) => {
      if (postDetail.images.length === 0)
        return setArrow({ l: false, r: false });
      if (current === 0) return setArrow({ l: false, r: true });
      if (current === postDetail.images.length - 1) {
        return setArrow({ l: true, r: false });
      }
      return setArrow({ l: true, r: true });
    },
    [postDetail.images]
  );

  const checkMentions = useCallback(
    (item: string, mentions: MentionSearch[]) => {
      const mention = mentions.find(
        (user: MentionSearch) =>
          user.name.replace(/\s/g, "") === item.substring(1)
      );
      if (mention) return <Link to={"#"}>{item} </Link>;
      else return item + " ";
    },
    []
  );

  const cuttingContent = (content: string) => {
    const splitContent = content.split(" ");
    const { mentions } = postDetail;

    return splitContent.map((item) => {
      // check case include \n
      if (item.indexOf("\n") > -1) {
        let changeItem = item.split("\n").join(" \n ").split(" ");
        // filter mention or url
        let checkMentionUrl = changeItem.map((item1) => {
          if (item1[0] === "@") {
            return checkMentions(item1, mentions);
          }
          if (isUrl(item1)) {
            !linkPreview && setLinkPreview(item1);
            return (
              <a href={item1} target={"_blank"} rel="noreferrer">
                {item1}
              </a>
            );
          }
          return item1;
        });

        return checkMentionUrl;
      }
      if (item[0] === "@") {
        return checkMentions(item, mentions);
      }

      if (isUrl(item)) {
        console.log("linkPreview", linkPreview);
        !linkPreview && setLinkPreview(item);
        return (
          <a href={item} rel="noreferrer">
            {item}{" "}
          </a>
        );
      }
      return item === " " ? <>&nbsp;</> : item;
    });
  };

  return (
    <PostDetailWrapper>
      <div className="title">
        <div className="author">
          <span className="avatar">
            <Avatar src={owner.profileImage} size={45}>
              {owner.name.charAt(0).toUpperCase()}
            </Avatar>
          </span>
          <div className="auth-name">
            <div className="name">{owner.name}</div>
            <div className="time">
              <span>{formatDate(postDetail.createdAt)}</span>{" "}
              <span>{typeMode(postDetail.modeHide)}</span>
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

      <div className="content">{cuttingContent(postDetail.content)}</div>
      <div className="img-content">
        <Carousel
          slidesToShow={1}
          dots={false}
          infinite={false}
          arrows={true}
          nextArrow={arrow.r ? <RightOutlined /> : <></>}
          prevArrow={arrow.l ? <LeftOutlined /> : <></>}
          afterChange={(current) => {
            handleChangeSlide(current);
          }}
        >
          {images.map((item: string) => (
            <Image src={item} alt="img" key={item} />
          ))}
        </Carousel>
      </div>
      {!images.length && linkPreview && (
        <div className="link-preview">
          <LinkPreview url={linkPreview} width={"100%"} />
        </div>
      )}
    </PostDetailWrapper>
  );
};

export default PostDetai;
