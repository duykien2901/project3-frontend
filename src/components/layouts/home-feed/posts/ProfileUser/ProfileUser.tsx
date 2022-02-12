import React, { useEffect } from "react";
import { ProfileUserWrapper } from "./profile-user";
import BaseButton from "src/components/base/BaseButton/BaseButton";
import useUser from "src/ducks/user/hook";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "src/ducks/user/selector";
import AvatarBase from "src/components/base/avatar/Avatar";
import usePost from "src/ducks/home/post/hook";
import { postSelector } from "src/ducks/home/post/selector";
import { Post } from "src/ducks/home/post";
import PostDetai from "../PostDetai";

const ProfileUser: React.FC = () => {
  const { userId }: { userId: string } = useParams();
  const { getProfileUser } = useUser();
  const { getPost, setIsVisiblePostModal } = usePost();
  const { userProfile, loggedUser } = useSelector(userSelector);
  const history = useHistory();
  const { posts } = useSelector(postSelector);

  useEffect(() => {
    getProfileUser(userId);
  }, [getProfileUser, userId]);

  useEffect(() => {
    getPost({ userId });
  }, [getPost, userId]);

  return (
    <ProfileUserWrapper>
      <div className="header-container">
        <div className="profile-info fb-flex">
          <div className="content fb-flex">
            <div className="avatar">
              <AvatarBase size={40} user={userProfile} />
            </div>
            <div className="user-name">
              <span className="text">{userProfile?.name}</span>
            </div>
          </div>
          <div className="follow fb-flex fb-justify-flex-end">
            <BaseButton
              text="Follow"
              iconCss="ic-16 icon-plus"
              btnStyle="btn-dark"
              // btnClick={()}
            ></BaseButton>
          </div>
        </div>
        <div className="back">
          <BaseButton
            text="Back"
            iconCss="ic-16 icon-back"
            btnStyle="btn-blue"
            btnClick={() => history.goBack()}
          ></BaseButton>
        </div>
      </div>
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
    </ProfileUserWrapper>
  );
};

export default ProfileUser;
