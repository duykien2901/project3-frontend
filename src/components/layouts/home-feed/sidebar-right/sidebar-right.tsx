import React from "react";
import CommunityCard from "src/components/base/CommunityCard/CommunityCard";
import { SidebarRightWrapper } from "./style";

const SidebarRight: React.FC = () => {
  return(
    <SidebarRightWrapper>
      <div className="right-sidebar">
        <div className="main-content">
          <div className="title">
            Suggested Communities
          </div>
          <div className="break-line"></div>
          <div className="accent-card">
            <CommunityCard name="Phòng công tác sinh viên" member="4,456">
            </CommunityCard>
            <CommunityCard name="CLA - Thi tiếng Anh" member="1,456">
            </CommunityCard>
            <CommunityCard name="Đoàn TN - Hội sinh viên trường đại học bách khoa" member="4,456">
            </CommunityCard>
          </div>
        </div>
      </div>
    </SidebarRightWrapper>
  )
}

export default SidebarRight;