import React, { useCallback, useEffect, useState } from "react";

import {
  EllipsisOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel, Dropdown, Image, Menu, Modal, Popover } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Post } from "src/ducks/home/post";
import { User } from "src/ducks/user";
import { formatDate } from "src/libs/helpers/utils/formatDate";
import { PostDetailWrapper } from "./style";
import publicIcon from "src/assets/img/globalMode.svg";
import friendIcon from "src/assets/img/friendMode.svg";
import privateIcon from "src/assets/img/privateMode.svg";
import editIcon from "src/assets/img/edit.svg";
import deleteIcon from "src/assets/img/delete.svg";
import likeIcon from "src/assets/img/like.svg";
import commentIcon from "src/assets/img/comment.svg";
import shareIcon from "src/assets/img/share.svg";

import { MODE_HIDE } from "src/constants/commom.constant";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { MentionSearch } from "src/ducks/home/post/mentions/hook";
import { Link } from "react-router-dom";
import isUrl from "src/libs/helpers/utils/url";
import usePost from "src/ducks/home/post/hook";
import AvatarBase from "src/components/base/avatar/Avatar";
import CommentPost from "./Comments/CommentPost";
import CommentDetail from "./Comments/CommentDetail";
import { useSelector } from "react-redux";
import { postSelector } from "src/ducks/home/post/selector";
import Reaction from "./Reaction";

export type PostDetail = {
  loggedUser: User | null;
  postDetail: Post;
  setIsVisiblePostModal: (isVisible: boolean) => void;
};

const PostDetai: React.FC<PostDetail> = ({
  loggedUser,
  postDetail,
  setIsVisiblePostModal,
}) => {
  const [arrow, setArrow] = useState({ l: false, r: false });
  const { owner, images } = postDetail;
  const [linkPreview, setLinkPreview] = useState("");
  const {
    getComments,
    deletePostById,
    showUpdatePost,
    commentUpdated,
    setCommentUpdated,
  } = usePost();
  const { comments } = useSelector(postSelector);
  const commentDetailPost = comments.find(
    (item) => item.postId === postDetail.id
  );

  const commentLength: number = commentDetailPost
    ? postDetail.totalComment - commentDetailPost.commentsPost.length
    : postDetail.totalComment;

  useEffect(() => {
    postDetail.images.length > 0 && setArrow({ l: false, r: true });
  }, [postDetail.images]);

  const menu = useCallback(
    (item: any) => {
      return (
        <Menu className="header">
          <Menu.Item
            key={"logout"}
            className="user-setting"
            icon={
              <img src={editIcon} alt="edit icon" className="header-menu" />
            }
            onClick={() => {
              showUpdatePost(item);
              setIsVisiblePostModal(true);
            }}
          >
            Sửa bài viết
          </Menu.Item>
          <Menu.Item
            key={"edit"}
            icon={<img src={deleteIcon} alt="delete" className="header-menu" />}
            className="user-setting"
            onClick={() => {
              Modal.confirm({
                content: "Bạn có chắc chắn muốn xóa",
                onOk: () => deletePostById(item.id),
              });
            }}
          >
            Xóa bài viết
          </Menu.Item>
        </Menu>
      );
    },
    [deletePostById, showUpdatePost, setIsVisiblePostModal]
  );

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

  const inforMention = useCallback((item: MentionSearch) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className="avatar"
          style={{
            marginRight: "15px",
            borderRadius: "50%",
            border: "0.5px solid #b1b1b1",
          }}
        >
          <Avatar src={item?.profileImage} size={45}>
            {item?.name.charAt(0).toUpperCase()}
          </Avatar>
        </span>
        <div>{item.name}</div>
      </div>
    );
  }, []);

  const cuttingContent = (content: string) => {
    const splitContent = content.split(" ");
    const { mentions } = postDetail;
    let mentionsClone = [...mentions];

    const checkMentions = (item: string) => {
      const mention = mentionsClone.find(
        (user: MentionSearch) =>
          user.name.replace(/\s/g, "") === item.substring(1)
      );
      if (mention) {
        // delete filter mention
        mentionsClone = mentionsClone.filter(
          (item) => item.userId !== mention.userId
        );
        return (
          <Popover content={inforMention(mention)} title={null}>
            <Link to={"#"} key={item + Math.random()}>
              {item}{" "}
            </Link>
          </Popover>
        );
      } else return item + " ";
    };

    return splitContent.map((item) => {
      // check case include \n
      if (item.indexOf("\n") > -1) {
        let changeItem = item.split("\n").join(" \n ").split(" ");
        // filter mention or url
        let checkMentionUrl = changeItem.map((item1) => {
          if (item1[0] === "@") {
            return checkMentions(item1);
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
        return checkMentions(item);
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
      return item === " " ? <>&nbsp;</> : item + " ";
    });
  };

  return (
    <PostDetailWrapper key={postDetail.id}>
      <div className="title">
        <div className="author">
          <AvatarBase user={owner} size={45} />
          <div className="auth-name">
            <div className="name">{owner.name}</div>
            <div className="time">
              <span>{formatDate(postDetail.createdAt)}</span>{" "}
              <span>{typeMode(postDetail.modeHide)}</span>
            </div>
          </div>
        </div>

        <div className="edit-btn">
          {postDetail.ownerId === loggedUser?.id && (
            <Dropdown
              overlay={menu(postDetail)}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="icon-edit">
                <EllipsisOutlined size={60} />
              </div>
            </Dropdown>
          )}
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
      <div className="line" />
      <div className="reaction">
        <Popover
          content={<Reaction />}
          title={null}
          trigger={"click"}
          placement="topLeft"
        >
          <span className="reaction-item">
            <img src={likeIcon} alt="" />
            <span>Thích</span>
          </span>
        </Popover>
        <span className="reaction-item">
          <img src={commentIcon} alt="comment" />
          <span>Bình luận</span>
        </span>
        <span className="reaction-item">
          <img src={shareIcon} alt="share" />
          <span>Chia sẻ</span>
        </span>
      </div>

      <div className="line" />

      {commentLength > 0 && (
        <div className="readMore" onClick={() => getComments(postDetail.id)}>
          Xem {commentLength} bình luận trước
        </div>
      )}

      {commentDetailPost?.commentsPost?.map((item) => {
        return commentUpdated?.id !== item.id ? (
          <CommentDetail comment={item} setCommentUpdated={setCommentUpdated} />
        ) : (
          <CommentPost
            postDetail={postDetail}
            commentUpdated={commentUpdated}
            setCommentUpdated={setCommentUpdated}
            isUpdate={true}
          />
        );
      })}

      <CommentPost postDetail={postDetail} />
    </PostDetailWrapper>
  );
};

export default PostDetai;
