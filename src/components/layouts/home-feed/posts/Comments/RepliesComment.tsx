import { Dropdown, Image, Menu, Modal, Popover } from "antd";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarBase from "src/components/base/avatar/Avatar";
import { Reply } from "src/ducks/home/post";
import { userSelector } from "src/ducks/user/selector";
import ContentCommom from "../commom/ContentCommom";
import editIcon from "src/assets/img/edit.svg";
import deleteIcon from "src/assets/img/delete.svg";
import Reaction from "../Reaction";
import { EllipsisOutlined } from "@ant-design/icons";
import usePost from "src/ducks/home/post/hook";
import { ReplyDetailWrapper } from "./replies.style";

type Props = {
  reply: Reply;
  setReplyUpdated: any;
  replyUpdated: Reply | null;
};

const RepliesComment: React.FC<Props> = ({ reply, setReplyUpdated }) => {
  const { loggedUser } = useSelector(userSelector);
  const { deleteReplyById } = usePost();

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
            content={<Reaction />}
            title={null}
            trigger={"click"}
            placement="topLeft"
          >
            <span>
              <span className="reaction-item">Thích</span>
              <span className="reaction-item">Phản hồi</span>
            </span>
          </Popover>
        </div>
      </div>
    </ReplyDetailWrapper>
  );
};

export default RepliesComment;
