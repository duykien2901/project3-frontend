import React from "react";
import BaseFeature from "src/components/base/BaseFeature/BaseFeature";
import { CommunityLeftWrapper } from "./style";

const CommunityLeft: React.FC = () => {
  return (
    <CommunityLeftWrapper>
      <div className="left-sidebar">
        <div className="simplebar-content">
          <div className="main-section">
            <BaseFeature name="Home Feed" icon=""/>
            <BaseFeature name="Inbox" icon=""/>
            <BaseFeature name="Comunities" icon=""/>
          </div>
          <div className="communities-section">
            <div className="title"> My Communities </div>
            <div className="main-content">
              <BaseFeature name="All company" icon=""/>
            </div>
          </div>
        </div>
      </div>
    </CommunityLeftWrapper>
  );
};
export default CommunityLeft;
