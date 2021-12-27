import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "src/ducks/user/selector";
import { PostHomeFeedWrapper } from "./style";
import uploadIcon from "src/assets/img/upload-image.svg";
import smileIcon from "src/assets/img/smile.svg";
import PostDetai from "./PostDetai";
import usePost from "src/ducks/home/post/hook";
import CreatePostModal from "./CreatePostModal";

const PostHomeFeed: React.FC = () => {
  const { loggedUser } = useSelector(userSelector);
  const { isVisiblePostModal, setIsVisiblePostModal } = usePost();

  return (
    <PostHomeFeedWrapper>
      <div className="post-create">
        <div className="feeling">
          <span className="avatar">
            <Avatar src={loggedUser?.profileImage} size={50}>
              {loggedUser?.name.charAt(0).toUpperCase()}
            </Avatar>
          </span>
          <div className="content" onClick={() => setIsVisiblePostModal(true)}>
            Bạn đang nghĩ gì
          </div>
        </div>
        <div className="line"></div>
        <div className="upload-content">
          <div className="upload">
            <img src={uploadIcon} alt="upload" />
            <span>Ảnh/ Video</span>
          </div>
          <div className="upload">
            <img src={smileIcon} alt="upload" />
            <span>Trạng thái</span>
          </div>
        </div>
      </div>

      <PostDetai loggedUser={loggedUser} />
      <CreatePostModal
        isVisiblePostModal={isVisiblePostModal}
        setIsVisiblePostModal={setIsVisiblePostModal}
        loggedUser={loggedUser}
      />
    </PostHomeFeedWrapper>
  );
};

export default PostHomeFeed;
