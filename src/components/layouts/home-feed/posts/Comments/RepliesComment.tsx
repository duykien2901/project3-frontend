import { Dropdown, Image, Menu, Modal, Popover } from "antd";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarBase from "src/components/base/avatar/Avatar";
import { Reply } from "src/ducks/home/post";
import { userSelector } from "src/ducks/user/selector";
import ContentCommom from "../commom/ContentCommom";
import editIcon from "src/assets/img/edit.svg";
import deleteIcon from "src/assets/img/delete.svg";
import { EllipsisOutlined } from "@ant-design/icons";
import usePost from "src/ducks/home/post/hook";
import { ReplyDetailWrapper } from "./replies.style";
import { REACTION_POST } from "src/constants/post.constant";

type Props = {
  reply: Reply;
  setReplyUpdated: any;
  replyUpdated: Reply | null;
  setMentionsReply: any;
};

const RepliesComment: React.FC<Props> = ({
  reply,
  setReplyUpdated,
  setMentionsReply,
}) => {
  const { loggedUser } = useSelector(userSelector);
  const { deleteReplyById, handleCreateReaction } = usePost();
  const { userId, profileImage, name } = reply.owner;
  const reactionPostKeys = Object.keys(REACTION_POST).find(
    (item) => REACTION_POST[item].value === reply?.reactions?.vote
  );

  const menu = useCallback(
    (reply: Reply) => {
      return (
        <Menu className="header">
          <Menu.Item
            key={"logout"}
            className="user-setting"
            icon={
              <img src={editIcon} alt="edit icon" className="header-menu" />
            }
            onClick={() => {
              setReplyUpdated(reply);
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
                onOk: () =>
                  deleteReplyById(reply.id, reply?.commentId, reply?.postId),
              });
            }}
          >
            Xóa bài viết
          </Menu.Item>
        </Menu>
      );
    },
    [deleteReplyById, setReplyUpdated]
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
                  replyId: reply.id,
                  replyIdComment: reply.commentId,
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
  }, [handleCreateReaction, loggedUser?.id, reply]);

  return (
    <ReplyDetailWrapper className="replies">
      <AvatarBase user={reply.owner} size={30} />
      <div>
        <div className="content-comment">
          <Link to={"#"} className="link-profile">
            {reply.owner.name}
          </Link>
          <ContentCommom content={reply.content} item={reply} />
          <div className="edit-btn">
            {reply.owner.id === loggedUser?.id && (
              <Dropdown
                overlay={menu(reply)}
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
        {reply.images[0] && (
          <div>
            <div className="img-comments">
              <Image src={reply.images[0]} alt="" />
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
                    replyId: reply.id,
                    replyIdComment: reply.commentId,
                    userId: loggedUser?.id,
                  })
                }
              >
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
                    replyId: reply.id,
                    replyIdComment: reply.commentId,
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
            onClick={() =>
              setMentionsReply({
                userId,
                name,
                profileImage,
              })
            }
          >
            Phản hồi
          </span>
        </div>
      </div>
    </ReplyDetailWrapper>
  );
};

export default RepliesComment;
