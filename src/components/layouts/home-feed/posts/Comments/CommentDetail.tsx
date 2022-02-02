import React, { Fragment, useCallback, useMemo, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Image, Menu, Modal, Popover } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AvatarBase from "src/components/base/avatar/Avatar";
import { Comment, Reply } from "src/ducks/home/post";
import { userSelector } from "src/ducks/user/selector";
import { CommentDetailWrapper } from "./style";
import editIcon from "src/assets/img/edit.svg";
import deleteIcon from "src/assets/img/delete.svg";
import replyIcon from "src/assets/img/reply.svg";
import usePost from "src/ducks/home/post/hook";
import ContentCommom from "../commom/ContentCommom";
import CommentPost from "./CommentPost";
import { postSelector } from "src/ducks/home/post/selector";
import RepliesComment from "./RepliesComment";
import { MentionSearch } from "src/ducks/home/post/mentions/hook";
import { REACTION_POST } from "src/constants/post.constant";

export type CommentProps = {
  comment: Comment;
  setCommentUpdated?: any;
  postId?: number;
};

const CommentDetail: React.FC<CommentProps> = ({
  comment,
  setCommentUpdated,
  postId,
}) => {
  const [replyUpdated, setReplyUpdated] = useState<Reply | null>(null);
  const [mentionsReply, setMentionsReply] = useState<MentionSearch>();
  const { loggedUser } = useSelector(userSelector);
  const { deleteCommentById, getAllReplies, handleCreateReaction } = usePost();
  const { repliesComment } = useSelector(postSelector);
  const repliesCommentDetail = repliesComment.find(
    (item) => item.commentId === comment.id
  );
  const replyLength: number = repliesCommentDetail
    ? comment?.totalReplies +
      repliesCommentDetail.newReplies -
      repliesCommentDetail.replies.length
    : comment?.totalReplies;

  const { userId, profileImage, name } = comment.owner;
  const reactionPostKeys = Object.keys(REACTION_POST).find(
    (item) => REACTION_POST[item].value === comment?.reactions?.vote
  );

  const menu = useCallback(
    (comment: Comment) => {
      return (
        <Menu className="header">
          <Menu.Item
            key={"logout"}
            className="user-setting"
            icon={
              <img src={editIcon} alt="edit icon" className="header-menu" />
            }
            onClick={() => {
              setCommentUpdated(comment);
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
                onOk: () => deleteCommentById(comment.id, comment?.postId),
              });
            }}
          >
            Xóa bài viết
          </Menu.Item>
        </Menu>
      );
    },
    [deleteCommentById, setCommentUpdated]
  );

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
                  commentId: comment.id,
                  postIdComment: comment.postId,
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
  }, [comment, handleCreateReaction, loggedUser?.id]);

  return (
    <Fragment>
      <CommentDetailWrapper>
        <AvatarBase user={comment.owner} size={35} />
        <div className="content-wrapper">
          <div className="content-comment">
            <Link to={"#"} className="link-profile">
              {comment.owner.name}
            </Link>

            <ContentCommom content={comment.content} item={comment} />

            <div className="edit-btn">
              {comment.owner.id === loggedUser?.id && (
                <Dropdown
                  overlay={menu(comment)}
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
          {comment.images[0] && (
            <div>
              <div className="img-comments">
                <Image src={comment.images[0]} alt="" />
              </div>
            </div>
          )}
          <div className="reaction-comments">
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
                      commentId: comment.id,
                      postIdComment: comment.postId,
                      userId: loggedUser?.id,
                    })
                  }
                >
                  <span
                    style={{ color: REACTION_POST[reactionPostKeys].color }}
                  >
                    {REACTION_POST[reactionPostKeys].text}
                  </span>
                </span>
              ) : (
                <span
                  className="reaction-item"
                  onClick={() =>
                    handleCreateReaction({
                      vote: REACTION_POST.LIKE.value,
                      commentId: comment.id,
                      postIdComment: comment.postId,
                      userId: loggedUser?.id,
                    })
                  }
                >
                  <span>Thích</span>
                </span>
              )}
            </Popover>
            <span
              className="reaction-item"
              onClick={() => {
                setMentionsReply({
                  userId: userId || "",
                  name,
                  profileImage,
                });
              }}
            >
              Phản hồi
            </span>
          </div>

          {!!replyLength && (
            <div
              onClick={() => getAllReplies(comment.id)}
              className="more-reply"
            >
              <span>
                <img className="img-reply" src={replyIcon} alt="" />
              </span>
              {replyLength} Phản hồi
            </div>
          )}

          {repliesCommentDetail?.replies.map((reply: Reply) => {
            return replyUpdated?.id !== reply.id ? (
              <RepliesComment
                reply={reply}
                key={reply?.id}
                replyUpdated={replyUpdated}
                setReplyUpdated={setReplyUpdated}
                setMentionsReply={setMentionsReply}
              />
            ) : (
              <CommentPost
                postId={postId}
                isReply={true}
                commentId={comment.id}
                replyUpdated={replyUpdated}
                setReplyUpdated={setReplyUpdated}
              />
            );
          })}
          {(mentionsReply || repliesCommentDetail) && (
            <CommentPost
              postId={postId}
              isReply={true}
              commentId={comment.id}
              mentionsReply={mentionsReply}
            />
          )}
        </div>
      </CommentDetailWrapper>
    </Fragment>
  );
};

export default CommentDetail;
