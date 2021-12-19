import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAccount from "src/ducks/header/account/hook";
import { setUser } from "src/ducks/user";
import { userSelector } from "src/ducks/user/selector";
import uploadFile from "src/libs/helpers/utils/uploadFile";
import { ModalUserWrapper } from "../style";
import ChangeName from "./ChangeName/ChangeName";

export type UserSettingProps = {
  isVisibleSetting: boolean;
  setIsVisibleSetting: (isVisible: boolean) => void;
};

const UserSetting: React.FC<UserSettingProps> = ({
  isVisibleSetting,
  setIsVisibleSetting,
}) => {
  const { loggedUser } = useSelector(userSelector);
  const { isVisibleNameSetting, setIsVisibleNameSetting } = useAccount();
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const dispatch = useDispatch();

  const uploadButton = () => {
    return (
      <div>
        <PlusOutlined />
      </div>
    );
  };

  const beforeUpload = useCallback(
    async (file) => {
      setLoadingUpload(true);
      const newUser = await uploadFile(file, loggedUser?.id);
      if (newUser) {
        dispatch(setUser({ user: newUser }));
      }
      setLoadingUpload(false);
    },
    [dispatch, loggedUser]
  );

  return (
    <ModalUserWrapper
      title="Cài đặt tài khoản"
      visible={isVisibleSetting}
      onCancel={() => setIsVisibleSetting(false)}
      width={700}
      footer={false}
    >
      <Row>
        <Col span={8}>
          <div className="profile-image">
            <Upload
              accept={".png,.jpg,.jpeg"}
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {loadingUpload ? (
                <LoadingOutlined />
              ) : loggedUser?.profileImage ? (
                <img
                  src={loggedUser?.profileImage}
                  alt="avatar"
                  className={"app-icon"}
                />
              ) : (
                uploadButton()
              )}
            </Upload>
            <div className="text-profile">Profile image</div>
          </div>
        </Col>
        <Col span={16} className="account-infor">
          <div className="title">
            <div>Name</div>
          </div>
          <div className="content name">
            <div>{loggedUser?.name}</div>
            <Button
              type="primary"
              onClick={() => setIsVisibleNameSetting(true)}
            >
              Change
            </Button>
          </div>
          <div className="title">
            <div>Email</div>
          </div>
          <div className="content email">
            <div>{loggedUser?.email}</div>
            <Button type="primary">Change</Button>
          </div>
          <div className="title">
            <div>Password</div>
          </div>
          <div className="content password">
            <div>************</div>
            <Button type="primary">Change</Button>
          </div>
        </Col>
      </Row>
      <ChangeName
        isVisibleNameSetting={isVisibleNameSetting}
        setIsVisibleNameSetting={setIsVisibleNameSetting}
        user={loggedUser}
      />
    </ModalUserWrapper>
  );
};

export default UserSetting;
