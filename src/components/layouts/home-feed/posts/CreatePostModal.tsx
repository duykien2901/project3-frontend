import { Avatar, Dropdown } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Formik } from "formik";
import { Form, FormItem, Select, SubmitButton } from "formik-antd";
import React, { memo, useMemo } from "react";
import { MODE_HIDE } from "src/constants/commom.constant";
import { User } from "src/ducks/user";
import { PostModalWrapper } from "./style";
import Picker from "emoji-picker-react";
import smileIcon from "src/assets/img/smile.svg";
import uploadIcon from "src/assets/img/upload-image.svg";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const { Option } = Select;

type Props = {
  isVisiblePostModal: boolean;
  setIsVisiblePostModal: (isVisible: boolean) => void;
  loggedUser: User | null;
};

const CreatePostModal: React.FC<Props> = ({
  isVisiblePostModal,
  setIsVisiblePostModal,
  loggedUser,
}) => {
  const pickerIcon = useMemo(() => {
    return <Picker disableSearchBar={true} onEmojiClick={() => {}} />;
  }, []);

  return (
    <PostModalWrapper
      footer={false}
      visible={isVisiblePostModal}
      title={"Tạo bài viết"}
      onCancel={() => setIsVisiblePostModal(false)}
      width={650}
    >
      <Formik
        initialValues={{
          content: "",
          modeHide: MODE_HIDE.PUBLIC.value,
        }}
        onSubmit={() => {}}
      >
        {() => {
          return (
            <Form>
              <div className="author">
                <span className="avatar">
                  <Avatar src={loggedUser?.profileImage} size={50}>
                    {loggedUser?.name.charAt(0).toUpperCase()}
                  </Avatar>
                </span>
                <div className="auth-name">
                  <div className="name">{loggedUser?.name}</div>
                  <div className="modeHide">
                    <FormItem
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="modeHide"
                      required
                    >
                      <Select
                        defaultValue={MODE_HIDE.PUBLIC.value}
                        style={{ width: 120 }}
                        name="modeHide"
                      >
                        {Object.keys(MODE_HIDE).map((item: string) => (
                          <Option value={MODE_HIDE[item].value}>
                            {MODE_HIDE[item].text}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </div>
                </div>
              </div>

              <div className="content-wrapper">
                <FormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="content"
                >
                  <TextArea
                    name="content"
                    placeholder="Bạn đang nghĩ gì"
                    bordered={false}
                    autoSize={{ minRows: 3, maxRows: 8 }}
                  />
                </FormItem>
                <div className="preview-link">
                  <LinkPreview
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    width="100%"
                  />
                </div>
                <div className="img-preview"></div>
              </div>
              <div className="btn-icon">
                <div className="title-add">Thêm vào bài viết</div>
                <div className="icon">
                  <img src={uploadIcon} alt="upload" />
                  <Dropdown overlay={pickerIcon} trigger={["click"]}>
                    <img src={smileIcon} alt="" />
                  </Dropdown>
                </div>
              </div>
              <div className="btn-submit">
                <SubmitButton type="primary" size="large">
                  Đăng
                </SubmitButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </PostModalWrapper>
  );
};

export default memo(CreatePostModal);
