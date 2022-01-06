import React from 'react';
import BackGroundImg from 'src/assets/img/background-img.jpg';
import AvatarImg from 'src/assets/img/unnamed.png'
import { ProfileCommunityWrapper } from './profile-community';

const ProfileCommunity: React.FC = () => {
  return (
    <ProfileCommunityWrapper>
      <div className="cover-background">
        <img src={BackGroundImg} alt="anh" />
      </div>
      <div className="space">
        <div className="avatar"
          style ={{ backgroundImage: "url('https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300')" }}
        >
          {/* <img src={AvatarImg} alt="" /> */}
        </div>
      </div>
      <div className="footer">
        <div className="footer-title fb-flex">
          <div className="title fb-flex fb-align-flex-end ">
            <span className="text">All Company</span>
          </div>
          <div className="toolbar fb-flex fb-align-flex-end fb-justify-flex-end">
            <button className="btn btn-like fb-flex fb-justify-center fb-align-center">...</button>
            <button className="btn btn-more fb-flex fb-justify-center fb-align-center">...</button>
          </div>
        </div>
        <div className="footer-tab fb-flex">
          <div className="tab-item actived">
            <div className="title fb-flex fb-align-center">Conversations</div>
            <div className="line"></div>
          </div>
          <div className="tab-item">
            <div className="title fb-flex fb-align-center">About</div>
            <div className="line"></div>
          </div>
          <div className="tab-item">
            <div className="title fb-flex fb-align-center">File</div>
            <div className="line"></div>
          </div>
          <div className="tab-item">
            <div className="title fb-flex fb-align-center">Events</div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </ProfileCommunityWrapper>
  )
}

export default ProfileCommunity;
