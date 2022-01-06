import React from "react";
import BaseButton from "src/components/base/BaseButton/BaseButton";
import BaseFeature from "src/components/base/BaseFeature/BaseFeature";
import useCommunity from "src/ducks/home/community/hook";
import CreateCommunityModal from "../create-community-modal/CreateCommunity";
import { CommunityLeftWrapper } from "./style";

const CommunityLeft: React.FC = () => {
  const {isVisibleCommunityModal, setIsVisibleCommunityModal} = useCommunity();
  function addCommunity() {
    setIsVisibleCommunityModal(true);
  }
  return (
    <CommunityLeftWrapper>
      <div className="left-sidebar">
        <div className="simplebar-content">
          <div className="main-section">
            <BaseFeature name="Home Feed" icon="" url="/"/>
            <BaseFeature name="Inbox" icon="" url="/inbox"/>
            <BaseFeature name="Comunities" icon="" url="/communities"/>
          </div>
          <div className="communities-section">
            <div className="title"> My Communities </div>
            <div className="main-content">
              <BaseFeature name="All company" icon="" url="/community/1"/>
            </div>
            <div className="add-community">
              <BaseButton btnStyle="btn-blue-2" iconCss="ic-14 icon-plus-circle" text="Create a Community" btnClick={addCommunity}></BaseButton>
            </div>
          </div>
        </div>
      </div>
      <CreateCommunityModal
        isVisibleCommunityModal={isVisibleCommunityModal}
        setIsVisibleCommunityModal={setIsVisibleCommunityModal}
      >

      </CreateCommunityModal>
    </CommunityLeftWrapper>
  );
};
export default CommunityLeft;
