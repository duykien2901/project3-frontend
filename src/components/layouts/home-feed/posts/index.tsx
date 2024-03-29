import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

import { userSelector } from "src/ducks/user/selector";
import { PostHomeFeedWrapper } from "./style";
import uploadIcon from "src/assets/img/upload-image.svg";
import smileIcon from "src/assets/img/smile.svg";
import PostDetai from "./PostDetai";
import usePost from "src/ducks/home/post/hook";
import CreatePostModal from "./CreatePostModal";
import { postSelector } from "src/ducks/home/post/selector";
import { Post } from "src/ducks/home/post";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PostHomeFeed: React.FC = () => {
  const { loggedUser } = useSelector(userSelector);
  const { isVisiblePostModal, setIsVisiblePostModal, getPost, isLoadingPost } =
    usePost();
  const { posts } = useSelector(postSelector);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <PostHomeFeedWrapper>
      <div className="post-create">
        <div className="feeling">
          <Link to={`/user/${loggedUser?.userId}`}>
            <span className="avatar">
              <Avatar src={loggedUser?.profileImage} size={50}>
                {loggedUser?.name.charAt(0).toUpperCase()}
              </Avatar>
            </span>
          </Link>
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
      {isLoadingPost ? (
        <div className="spin">
          <LoadingOutlined />
        </div>
      ) : (
        <div>
          {posts.map((post: Post) => (
            <PostDetai
              loggedUser={loggedUser}
              postDetail={post}
              setIsVisiblePostModal={setIsVisiblePostModal}
              key={post.id}
            />
          ))}
        </div>
      )}

      <CreatePostModal
        isVisiblePostModal={isVisiblePostModal}
        setIsVisiblePostModal={setIsVisiblePostModal}
        loggedUser={loggedUser}
      />
    </PostHomeFeedWrapper>
  );
};

export default PostHomeFeed;
