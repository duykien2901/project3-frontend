import { Formik } from "formik";
import { FormItem } from "formik-antd";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import AvatarBase from "src/components/base/avatar/Avatar";
import { userSelector } from "src/ducks/user/selector";
import { CommemtWrapper } from "./style";
import uploadIcon from "src/assets/img/upload-image.svg";
import smileIcon from "src/assets/img/smile.svg";
import { Dropdown, Mentions, Upload } from "antd";
import usePost from "src/ducks/home/post/hook";
import Picker from "emoji-picker-react";
import useMentions, { MentionSearch } from "src/ducks/home/post/mentions/hook";
import { postSelector } from "src/ducks/home/post/selector";
import { Post } from "src/ducks/home/post";
export type CommentProps = {
  postDetail: Post;
};
const CommentPost: React.FC<CommentProps> = ({ postDetail }) => {
  const { loggedUser } = useSelector(userSelector);
  const { commentDetail } = useSelector(postSelector);

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
    handleCommentSubmit,
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

  const handleKeyPress = useCallback((e, submitForm) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      submitForm();
    }
  }, []);

  return (
    <CommemtWrapper>
      <div className="comment-input">
        <AvatarBase user={loggedUser} size={35} />
        <Formik
          initialValues={{ content: "" }}
          onSubmit={(values) => {
            handleCommentSubmit({
              content,
              images: imagePost,
              mentions,
              isUpdate: !!commentDetail,
              id: commentDetail?.id,
              postId: postDetail.id,
            });
          }}
        >
          {({ submitForm }) => {
            return (
              <div className="input-wrapper">
                <FormItem name="content">
                  <Mentions
                    name="content"
                    value={content}
                    autoSize={{ minRows: 1, maxRows: 8 }}
                    onChange={(text: string) => {
                      handleChange(text);
                      cutStringContent(text);
                      splitUrlContent(text);
                    }}
                    placeholder="Viết bình luận"
                    onKeyPress={(e) => {
                      handleKeyPress(e, submitForm);
                    }}
                    maxLength={3000}
                    loading={loading}
                    prefix={["@"]}
                    filterOption={(text: string, props: any) => props}
                    onSearch={handleSearchMentions}
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
                            <AvatarBase size={30} user={item} />
                            <span>{item.name}</span>
                          </div>
                        </Mentions.Option>
                      );
                    })}
                  </Mentions>
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
