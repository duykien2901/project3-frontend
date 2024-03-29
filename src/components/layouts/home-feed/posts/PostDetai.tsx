import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
import likeNewIcon from "src/assets/img/like-new.svg";
import loveIcon from "src/assets/img/love.svg";

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
import { REACTION_POST } from "src/constants/post.constant";

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
    visibleComment,
    setVisibleComment,
    // reaction,
    // setReaction,
    handleCreateReaction,
  } = usePost();
  const { comments } = useSelector(postSelector);
  const commentDetailPost = comments.find(
    (item) => item.postId === postDetail.id
  );

  const commentLength: number = commentDetailPost
    ? postDetail.totalComment +
      commentDetailPost.newComment -
      commentDetailPost.commentsPost.length
    : postDetail.totalComment;

  const reactionPostKeys = Object.keys(REACTION_POST).find(
    (item) => REACTION_POST[item].value === postDetail?.reactions?.vote
  );

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
          <Popover
            content={inforMention(mention)}
            title={null}
            key={item + Math.random()}
          >
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

  const renderReaction = useMemo(() => {
    return (
      <div className="react-container">
        {Object.keys(REACTION_POST).map((item: any) => {
          const { text, icon } = REACTION_POST[item];
          return (
            <span
              key={text}
              onClick={() =>
                handleCreateReaction({
                  vote: REACTION_POST[item].value,
                  postId: postDetail.id,
                  userId: loggedUser?.id,
                })
              }
            >
              <img src={icon} alt="" />
            </span>
          );
        })}
      </div>
    );
  }, [handleCreateReaction, loggedUser, postDetail]);

  return (
    <PostDetailWrapper key={postDetail.id}>
      <div className="title">
        <Link to={`/user/${owner.userId}`}>
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
        </Link>

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
      <div className="total">
        <div className="total-reactions">
          <span className="reactions-item">
            <img src={likeNewIcon} alt="" />
          </span>
          <span className="reactions-item">
            <img src={loveIcon} alt="" />
          </span>
          <span className="reactions-length">{postDetail.totalReactions}</span>
        </div>
      </div>
      <div className="line" />
      <div className="reaction">
        <Popover
          content={renderReaction}
          title={null}
          trigger={"hover"}
          placement="topLeft"
        >
          {reactionPostKeys ? (
            <span
              className="reaction-item"
              onClick={() =>
                handleCreateReaction({
                  vote: 0,
                  postId: postDetail.id,
                  userId: loggedUser?.id,
                })
              }
            >
              <img src={REACTION_POST[reactionPostKeys].icon} alt="" />
              <span style={{ color: REACTION_POST[reactionPostKeys].color }}>
                {REACTION_POST[reactionPostKeys].text}
              </span>
            </span>
          ) : (
            <span
              className="reaction-item"
              onClick={() =>
                handleCreateReaction({
                  vote: REACTION_POST.LIKE.value,
                  postId: postDetail.id,
                  userId: loggedUser?.id,
                })
              }
            >
              <img src={likeIcon} alt="" />
              <span>Thích</span>
            </span>
          )}
        </Popover>
        <span className="reaction-item" onClick={() => setVisibleComment(true)}>
          <img src={commentIcon} alt="comment" />
          <span>Bình luận</span>
        </span>
        <span className="reaction-item">
          <img src={shareIcon} alt="share" />
          <span>Chia sẻ</span>
        </span>
      </div>

      {visibleComment && (
        <Fragment>
          <div className="line" />

          {commentLength > 0 && (
            <div
              className="readMore"
              onClick={() => getComments(postDetail.id)}
            >
              Xem {commentLength} bình luận trước
            </div>
          )}

          {commentDetailPost?.commentsPost?.map((item) => {
            return commentUpdated?.id !== item.id ? (
              <CommentDetail
                comment={item}
                setCommentUpdated={setCommentUpdated}
                postId={postDetail.id}
                key={item.id}
              />
            ) : (
              <CommentPost
                postId={postDetail.id}
                commentUpdated={commentUpdated}
                setCommentUpdated={setCommentUpdated}
              />
            );
          })}

          <CommentPost postId={postDetail.id} />
        </Fragment>
      )}
    </PostDetailWrapper>
  );
};

export default PostDetai;
