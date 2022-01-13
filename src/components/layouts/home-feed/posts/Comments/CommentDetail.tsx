import { Popover } from "antd";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import AvatarBase from "src/components/base/avatar/Avatar";
import { Comment } from "src/ducks/home/post";
import usePost from "src/ducks/home/post/hook";
import { MentionSearch } from "src/ducks/home/post/mentions/hook";
import isUrl from "src/libs/helpers/utils/url";
import { CommentDetailWrapper } from "./style";

export type CommentProps = {
  comment: Comment;
};

const CommentDetail: React.FC<CommentProps> = ({ comment }) => {
  const [linkPreview, setLinkPreview] = useState("");

  const inforMention = useCallback((item: MentionSearch) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="avatar">
          <AvatarBase user={item} size={35} />
        </span>
        <div>{item.name}</div>
      </div>
    );
  }, []);

  const cuttingContent = (content: string) => {
    const splitContent = content.split(" ");
    const { mentions } = comment;
    let mentionsClone = [...mentions];

    const checkMentions = (item: string) => {
      const mention = mentionsClone.find(
        (user: MentionSearch) =>
          user.name.replace(/\s/g, "") === item.substring(1)
      );
      if (mention) {
        // delete filter mention
        mentionsClone = mentionsClone.filter(
          (item) => item.userId !== mention.userId
        );
        return (
          <Popover content={inforMention(mention)} title={null}>
            <Link to={"#"} key={item + Math.random()}>
              {item}{" "}
            </Link>
          </Popover>
        );
      } else return item + " ";
    };

    return splitContent.map((item) => {
      // check case include \n
      if (item.indexOf("\n") > -1) {
        let changeItem = item.split("\n").join(" \n ").split(" ");
        // filter mention or url
        let checkMentionUrl = changeItem.map((item1) => {
          if (item1[0] === "@") {
            return checkMentions(item1);
          }
          if (isUrl(item1)) {
            !linkPreview && setLinkPreview(item1);
            return (
              <a href={item1} target={"_blank"} rel="noreferrer">
                {item1}
              </a>
            );
          }
          return item1;
        });

        return checkMentionUrl;
      }
      if (item[0] === "@") {
        return checkMentions(item);
      }

      if (isUrl(item)) {
        console.log("linkPreview", linkPreview);
        !linkPreview && setLinkPreview(item);
        return (
          <a href={item} target={"_blank"} rel="noreferrer">
            {item}{" "}
          </a>
        );
      }
      return item === " " ? <>&nbsp;</> : item + " ";
    });
  };

  return (
    <CommentDetailWrapper>
      <AvatarBase user={comment.owner} size={35} />
      <div className="content-comment">
        <Link to={"#"} className="link-profile">
          {comment.owner.name}
        </Link>
        <div>{cuttingContent(comment.content)}</div>
      </div>
    </CommentDetailWrapper>
  );
};

export default CommentDetail;
