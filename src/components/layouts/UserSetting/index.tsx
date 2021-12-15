import React from "react";
import { ModalUserWrapper } from "../style";

export type UserSettingProps = {
  isVisibleSetting: boolean;
};

const UserSetting: React.FC<UserSettingProps> = ({ isVisibleSetting }) => {
  return (
    <ModalUserWrapper title="Cài đặt tài khoản" visible={isVisibleSetting}>
      <div>ss</div>
    </ModalUserWrapper>
  );
};

export default UserSetting;
