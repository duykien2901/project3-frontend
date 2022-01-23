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
import { Comment, Post, Reply } from "src/ducks/home/post";
import closeIcon from "src/assets/img/x.svg";

export type CommentProps = {
  postId?: number;
  commentUpdated?: Comment | null;
  setCommentUpdated?: (commentUpdated: Comment | null) => void;
  reply?: boolean;
  commentId?: number;
  replyUpdated?: Reply | null;
  setReplyUpdated?: any;
  mentionsReply?: MentionSearch;
};
const CommentPost: React.FC<CommentProps> = ({
  postId,
  commentUpdated,
  setCommentUpdated = () => {},
  setReplyUpdated = () => {},
  commentId,
  reply,
  replyUpdated,
  mentionsReply,
}) => {
  const { loggedUser } = useSelector(userSelector);

  const {
    handleChange,
    beforeUpload,
    content,
    setContent,
    imagePost,
    splitUrlContent,
    setImagePost,
    handleCommentSubmit,
    handleCreateReply,
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

  const setInitData = useCallback(
    (value: any) => {
      setContent(value.content);
      setMentions(value.mentions);
      setImagePost(value.images);
    },
    [setContent, setImagePost, setMentions]
  );

  useEffect(() => {
    commentUpdated && setInitData(commentUpdated);

    replyUpdated && setInitData(replyUpdated);
  }, [commentUpdated, replyUpdated, setInitData]);

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
    <CommemtWrapper style={{ marginBottom: commentUpdated ? "30px" : "" }}>
      <div className="comment-input">
        <AvatarBase user={loggedUser} size={reply ? 30 : 35} />
        <Formik
          initialValues={{ content: "" }}
          onSubmit={async (values) => {
            if (reply) {
              await handleCreateReply({
                id: replyUpdated?.id,
                content,
                images: imagePost,
                mentions,
                isUpdate: !!replyUpdated,
                postId,
                commentId,
              });
              replyUpdated && setReplyUpdated(null);
            } else {
              await handleCommentSubmit({
                content,
                images: imagePost,
                mentions,
                isUpdate: !!commentUpdated,
                id: commentUpdated?.id,
                postId,
              });
              commentUpdated && setCommentUpdated(null);
            }
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

      {(commentUpdated || replyUpdated) && (
        <div className="cancel">
          <span
            className="cancel-item"
            onClick={() => {
              commentUpdated && setCommentUpdated(null);
              replyUpdated && setReplyUpdated(null);
            }}
          >
            Hủy
          </span>
        </div>
      )}
    </CommemtWrapper>
  );
};

export default CommentPost;
