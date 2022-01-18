import { Popover } from "antd";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import AvatarBase from "src/components/base/avatar/Avatar";
import { MentionSearch } from "src/ducks/home/post/mentions/hook";
import isUrl from "src/libs/helpers/utils/url";

const ContentCommom: React.FC<{ content: string; item: any }> = ({
  content,
  item,
}) => {
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

  const splitContent = content.split(" ");
  const { mentions } = item;
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

  return (
    <div>
      {splitContent.map((item) => {
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
          !linkPreview && setLinkPreview(item);
          return (
            <a href={item} target={"_blank"} rel="noreferrer">
              {item}{" "}
            </a>
          );
        }
        return item === " " ? <>&nbsp;</> : item + " ";
      })}
    </div>
  );
};

export default ContentCommom;
