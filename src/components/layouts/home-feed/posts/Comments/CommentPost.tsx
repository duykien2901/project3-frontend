import { Formik } from "formik";
import { FormItem } from "formik-antd";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Dropdown, Mentions, Upload } from "antd";

import AvatarBase from "src/components/base/avatar/Avatar";
import { userSelector } from "src/ducks/user/selector";
import { CommemtWrapper } from "./style";
import uploadIcon from "src/assets/img/upload-image.svg";
import smileIcon from "src/assets/img/smile.svg";
import usePost from "src/ducks/home/post/hook";
import Picker from "emoji-picker-react";
import useMentions, { MentionSearch } from "src/ducks/home/post/mentions/hook";
import { postSelector } from "src/ducks/home/post/selector";
import { Comment, Post } from "src/ducks/home/post";
import closeIcon from "src/assets/img/x.svg";

export type CommentProps = {
  postDetail: Post;
  commentUpdated?: Comment | null;
  setCommentUpdated?: (commentUpdated: Comment | null) => void;
  isUpdate?: boolean;
};
const CommentPost: React.FC<CommentProps> = ({
  postDetail,
  commentUpdated,
  setCommentUpdated = () => {},
  isUpdate = false,
}) => {
  const { loggedUser } = useSelector(userSelector);

  const {
    handleChange,
    beforeUpload,
    content,
    setContent,
    imagePost,
    isLoading,
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

  useEffect(() => {
    if (isUpdate && commentUpdated) {
      setContent(commentUpdated.content);
      setMentions(commentUpdated.mentions);
      setImagePost(commentUpdated.images);
    }
  }, [commentUpdated, isUpdate, setContent, setImagePost, setMentions]);

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
    console.log(e.keyCode);
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      submitForm();
    }
  }, []);

  return (
    <CommemtWrapper style={{ marginBottom: commentUpdated ? "30px" : "" }}>
      <div className="comment-input">
        <AvatarBase user={loggedUser} size={35} />
        <Formik
          initialValues={{ content: "" }}
          onSubmit={async (values) => {
            await handleCommentSubmit({
              content,
              images: imagePost,
              mentions,
              isUpdate: !!commentUpdated,
              id: commentUpdated?.id,
              postId: postDetail.id,
            });
            isUpdate && setCommentUpdated(null);
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
                  {!imagePost.length && (
                    <Upload
                      accept={".png,.jpg,.jpeg"}
                      name="avatar"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                    >
                      <img src={uploadIcon} alt="upload" />
                    </Upload>
                  )}
                  <Dropdown overlay={pickerIcon} trigger={["click"]}>
                    <img src={smileIcon} alt="" />
                  </Dropdown>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>

      {!!imagePost.length && (
        <div className="img-preview">
          <img className="img-item" src={imagePost[0]} alt="" />
          <span className="close-btn" onClick={() => setImagePost([])}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
      )}

      {commentUpdated && (
        <div className="cancel">
          <span
            className="cancel-item"
            onClick={() => isUpdate && setCommentUpdated(null)}
          >
            Hủy
          </span>
        </div>
      )}
    </CommemtWrapper>
  );
};

export default CommentPost;
