import { notification } from 'antd';
import { CommunityPermissionEnum } from 'src/constants/community.constant';
import { CommunityAccessLevelEnum } from 'src/constants/community.constant';
import { userSelector } from "src/ducks/user/selector";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorMessage } from 'src/constants/error.consstant';
import axiosInstance from 'src/services';
import { API_ENDPOINTS } from 'src/constants/commom.constant';


const useCommunity = () => {
  const [isVisibleCommunityModal, setIsVisibleCommunityModal] = useState<boolean>(false);
  const { loggedUser } = useSelector(userSelector);
  const [communityName, setCommunityName] = useState<string>("");
  const [communityDes, setCommunityDes] = useState<string>("");
  const [communityMembers, setCommunityMembers] = useState<string[]>([]);
  const [communityPermission, setCommunityPermission] = useState<Number>(CommunityPermissionEnum.Public);
  const [communityAccessLevel, setCommunityAccessLevel] = useState<Number>(CommunityAccessLevelEnum.Internal);

  const createCommunity = async () => {
    try {
      const params = {
        name: communityName,
        description: communityDes,
        members: communityMembers,
        permission: communityPermission,
        accessLevel: communityAccessLevel
      }
      const data = await axiosInstance.post(`${API_ENDPOINTS.GROUP}?userId=${loggedUser?.id}`, params);
    } catch (error) {
      console.log(error);
      notification.error({
        message: ErrorMessage.Exception,
        duration: 2
      })
    }
  }

  return {
    isVisibleCommunityModal,
    setIsVisibleCommunityModal,
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
  }
}

export default useCommunity;