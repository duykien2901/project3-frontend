import React from "react";
import { ProfileUserWrapper } from "./profile-user";
import BaseButton from "src/components/base/BaseButton/BaseButton";

const ProfileUser: React.FC = () =>{
  function btnClicked() {
    console.log("button click");
  }
  return (
  <ProfileUserWrapper>
    <div className="header-container">
      <div className="profile-info fb-flex">
        <div className="content fb-flex">
          <div className="avatar">
            <img src="" alt="" />
          </div>
          <div className="user-name">
            <span className="text">Hoàng Hải Đăng 20183877</span>
          </div>
        </div>
        <div className="follow fb-flex fb-justify-flex-end">
          <BaseButton text="Follow" iconCss="ic-16 icon-plus" btnStyle="btn-dark" btnClick={btnClicked}></BaseButton>
        </div>
      </div>
      <div className="back">
        <BaseButton text="Back" iconCss="ic-16 icon-back" btnStyle="btn-blue" btnClick={btnClicked}></BaseButton>
      </div>
    </div>
  </ProfileUserWrapper>
  )
}

export default ProfileUser;
