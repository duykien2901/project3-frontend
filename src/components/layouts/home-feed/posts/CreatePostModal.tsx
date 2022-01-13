import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Avatar, Dropdown, Mentions, Upload } from "antd";
import { Formik } from "formik";
import { Form, FormItem, Select, SubmitButton } from "formik-antd";
import Picker from "emoji-picker-react";
import { CloseOutlined } from "@ant-design/icons";

import { MODE_HIDE } from "src/constants/commom.constant";
import { User } from "src/ducks/user";
import { PostModalWrapper } from "./style";
import smileIcon from "src/assets/img/smile.svg";
import uploadIcon from "src/assets/img/upload-image.svg";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import usePost from "src/ducks/home/post/hook";
import useMentions, { MentionSearch } from "src/ducks/home/post/mentions/hook";
import { useDispatch, useSelector } from "react-redux";
import { postSelector } from "src/ducks/home/post/selector";
import { setPostDetail } from "src/ducks/home/post";

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
  const { postDetail } = useSelector(postSelector);
  const dispatch = useDispatch();
  const {
    handleChange,
    beforeUpload,
    content,
    setContent,
    imagePost,
    deleteImagePost,
    splitUrlContent,
    linkPreview,
    handelSubmit,
    setImagePost,
    setInitial,
  } = usePost();

  const {
    handleSetMentions,
    handleSearchMentions,
    mentionSearch,
    loading,
    cutStringContent,
    mentions,
    setMentions,
  } = useMentions();

  useEffect(() => {
    if (postDetail) {
      setImagePost(postDetail.images);
      setMentions(postDetail.mentions);
      setContent(postDetail.content);
      splitUrlContent(postDetail.content);
    }
  }, [postDetail, setContent, setImagePost, setMentions, splitUrlContent]);

  const resetFormPost = useCallback(() => {
    setIsVisiblePostModal(false);
    dispatch(setPostDetail({ post: null }));
    setInitial();
    setMentions([]);
  }, [dispatch, setInitial, setIsVisiblePostModal, setMentions]);

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

  const checkSubmit = content || !!imagePost.length;

  return (
    <PostModalWrapper
      footer={false}
      visible={isVisiblePostModal}
      title={"Tạo bài viết"}
      onCancel={() => {
        resetFormPost();
      }}
      width={750}
    >
      <Formik
        initialValues={{
          content: content,
          modeHide: postDetail ? postDetail.modeHide : MODE_HIDE.PUBLIC.value,
        }}
        onSubmit={async (values) => {
          await handelSubmit({
            modeHide: values.modeHide,
            content,
            images: imagePost,
            mentions,
            isUpdate: !!postDetail,
            id: postDetail?.id,
          });
          resetFormPost();
        }}
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
                          <Option value={MODE_HIDE[item].value} key={item}>
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
                  <Mentions
                    name="content"
                    autoSize={{ minRows: 3, maxRows: 8 }}
                    placeholder={"Bạn đang nghĩ gì"}
                    value={content}
                    onChange={(text: string) => {
                      handleChange(text);
                      cutStringContent(text);
                      splitUrlContent(text);
                    }}
                    maxLength={3000}
                    loading={loading}
                    prefix={["@"]}
                    filterOption={(text: string, props: any) => props}
                    onSearch={handleSearchMentions}
                    onSelect={(item) => console.log(item)}
                  >
                    {mentionSearch?.map((item: MentionSearch) => {
                      return (
                        <Mentions.Option
                          value={item.name.replace(/\s/g, "")}
                          key={item.userId}
                        >
                          <div
                            onClick={() => {
                              handleSetMentions(item);
                            }}
                          >
                            <Avatar
                              src={item?.profileImage}
                              size={30}
                              className="avatar-img"
                            >
                              {item?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <span>{item.name}</span>
                          </div>
                        </Mentions.Option>
                      );
                    })}
                  </Mentions>
                </FormItem>
                <div className="preview-link">
                  {linkPreview && (
                    <LinkPreview url={linkPreview} width="100%" />
                  )}
                </div>

                {imagePost.map((item) => (
                  <div className="img-preview" key={item}>
                    <img src={item} alt="preview" />
                    <div
                      className="close-btn"
                      onClick={() => deleteImagePost(item)}
                    >
                      <span>
                        <CloseOutlined />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn-icon">
                <div className="title-add">Thêm vào bài viết</div>
                <div className="icon">
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
              <div className="btn-submit">
                <SubmitButton
                  type="primary"
                  size="large"
                  disabled={!checkSubmit}
                >
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
