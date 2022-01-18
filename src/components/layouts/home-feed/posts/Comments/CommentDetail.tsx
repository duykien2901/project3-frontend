import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Image, Menu, Modal, Popover } from "antd";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarBase from "src/components/base/avatar/Avatar";
import { Comment } from "src/ducks/home/post";
import { userSelector } from "src/ducks/user/selector";
import Reaction from "../Reaction";
import { CommentDetailWrapper } from "./style";
import editIcon from "src/assets/img/edit.svg";
import deleteIcon from "src/assets/img/delete.svg";
import usePost from "src/ducks/home/post/hook";
import ContentCommom from "../commom/ContentCommom";

export type CommentProps = {
  comment: Comment;
  setCommentUpdated?: any;
};

const CommentDetail: React.FC<CommentProps> = ({
  comment,
  setCommentUpdated,
}) => {
  const { loggedUser } = useSelector(userSelector);
  const { deleteCommentById } = usePost();

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

  return (
    <CommentDetailWrapper>
      <AvatarBase user={comment.owner} size={35} />
      <div>
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
    </CommentDetailWrapper>
  );
};

export default CommentDetail;
