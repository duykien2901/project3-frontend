import { Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import AvatarBase from "src/components/base/avatar/Avatar";
import { userSelector } from "src/ducks/user/selector";
import { CommemtWrapper } from "./style";
import uploadIcon from "src/assets/img/upload-image.svg";
import smileIcon from "src/assets/img/smile.svg";
import { Dropdown, Upload } from "antd";
import usePost from "src/ducks/home/post/hook";
import Picker from "emoji-picker-react";

const CommentPost: React.FC = () => {
  const { loggedUser } = useSelector(userSelector);
  const { beforeUpload, content, setContent } = usePost();

  const pickerIcon = useMemo(() => {
    return (
      <Picker
        disableSearchBar={true}
        onEmojiClick={(event, emojiObject) => {
          setContent(content + emojiObject.emoji);
        }}
      />
    );
  }, [content, setContent]);

  return (
    <CommemtWrapper>
      <div className="comment-input">
        <AvatarBase user={loggedUser} size={35} />
        <Formik
          initialValues={{ content: "" }}
          onSubmit={(values) => {
            console.log("ss");
          }}
        >
          {({ submitForm }) => {
            return (
              <div className="input-wrapper">
                <FormItem name="content">
                  <Input
                    bordered={false}
                    size="large"
                    name="content"
                    placeholder="Viết bình luận"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitForm();
                      }
                      console.log(e.key);
                    }}
                  />
                </FormItem>
                <div className="upload">
                  <Upload
                    accept={".png,.jpg,.jpeg"}
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                  >
                    <img src={uploadIcon} alt="upload" />
                  </Upload>
                  <Dropdown overlay={pickerIcon} trigger={["click"]}>
                    <img src={smileIcon} alt="" />
                  </Dropdown>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </CommemtWrapper>
  );
};

export default CommentPost;
