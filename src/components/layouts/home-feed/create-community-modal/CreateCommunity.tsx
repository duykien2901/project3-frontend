import { Button, notification, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import { CommunityAccessLevel, CommunityAccessLevelEnum, CommunityPermission, CommunityPermissionEnum } from "src/constants/community.constant";
import { ErrorMessage } from "src/constants/error.consstant";
import useCommunity from "src/ducks/home/community/hook";
import { CreateCommunityModalWrapper } from "./create-community-modal";

type Props = {
  isVisibleCommunityModal: boolean;
  setIsVisibleCommunityModal: (isVisible: boolean) => void;
}

const CreateCommunityModal: React.FC<Props> = ({
  isVisibleCommunityModal,
  setIsVisibleCommunityModal,
}) => {
  const {
    communityName,
    setCommunityName,
    communityDes,
    setCommunityDes,
    communityMembers,
    setCommunityMembers,
    communityPermission,
    setCommunityPermission,
    communityAccessLevel,
    setCommunityAccessLevel,
    createCommunity
  } = useCommunity();
  const children = [];
  const permission = [
    <Option key={CommunityPermissionEnum.Public.toString()}>{CommunityPermission.Public}</Option>,
    <Option key={CommunityPermissionEnum.Private.toString()}>{CommunityPermission.Private}</Option>
  ]
  const accessLevel = [ 
    <Option key={CommunityAccessLevelEnum.Internal.toString()}>{CommunityAccessLevel.Internal}</Option>,
    <Option key={CommunityAccessLevelEnum.External.toString()}>{CommunityAccessLevel.External}</Option>
  ]

  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  function resetForm() {
    setCommunityName("");
    setCommunityDes("");
    setCommunityMembers([]);
    setCommunityAccessLevel(CommunityAccessLevelEnum.Internal);
    setCommunityPermission(CommunityPermissionEnum.Public)
    setIsVisibleCommunityModal(false);
  }

  async function createCommunityHandler() {
    if(communityName.trim() !== "") {
      await createCommunity();
      resetForm();
    } else {
      notification.error({
        message: ErrorMessage.CommunityNameEmpty,
        duration: 2
      });
    }
  }

  function membersSelected(memberIDs: any) {
    console.log(communityMembers);
    setCommunityMembers(memberIDs);
  }

  function accessLevelChange(al: string) {
    setCommunityAccessLevel(Number(al));
  }

  function permissionChange(per: string) {
    setCommunityPermission(Number(per));
  }

  return(
    <CreateCommunityModalWrapper
      visible={isVisibleCommunityModal}
      title={"Create a community"}
      onCancel={() => {
        resetForm();
      }}
      width={600}
      footer={[
        <Button type="default" onClick={createCommunityHandler}>
          Create
        </Button>
      ]}
    >
      <div className="dialog-container">
        <div className="community-info">
          <div className="community-field fb-flex fb-flex-column">
            <label htmlFor="communityName" className="name">
              <span className="text">Name</span>
              <span className="star">*</span>
            </label>
            <input 
              type="text" 
              id="communityName" 
              placeholder="Name Your Community" 
              className="input-field" 
              value={communityName} 
              onChange={(e) => {setCommunityName(e.target.value)}}
            />
          </div>
          <div className="community-field fb-flex fb-flex-column">
            <label htmlFor="description" className="name">
              <span className="text">Description</span>
            </label>
            <textarea 
              id="description" 
              placeholder="Describe this community to orthers" 
              className="textarea-field"
              value={communityDes}
              onChange={(e) => {setCommunityDes(e.target.value)}}
            />
          </div>
          <div className="community-field fb-flex fb-flex-column">
            <label htmlFor="members" className="name">
              <span className="text">Members</span>
            </label>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              onChange={membersSelected}
              value={communityMembers}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
          </div>
        </div>
        <div className="community-setting">
          <div className="title">
            <span className="text">Edit settings</span>
          </div>
          <div className="community-field fb-flex fb-flex-column">
            <label htmlFor="accessLevel" className="name">
              <span className="text">Internal or External</span>
            </label>
            <Select 
              onChange={accessLevelChange} 
              style={{ width: '100%' }}
              value={communityAccessLevel.toString()}
            >
              {accessLevel}
            </Select>
          </div>
          <div className="community-field fb-flex fb-flex-column">
            <label htmlFor="permission" className="name">
              <span className="text">Select public or private community</span>
            </label>
            <Select 
              onChange={permissionChange} 
              style={{ width: '100%' }}
              value={communityPermission.toString()}
            >
              {permission}
            </Select>
          </div>
        </div>
      </div>
    </CreateCommunityModalWrapper>
  )
}

export default CreateCommunityModal;