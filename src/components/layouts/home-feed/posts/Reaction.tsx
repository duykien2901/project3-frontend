import React, { memo } from "react";
import { REACTION_POST } from "src/constants/post.constant";

const Reaction: React.FC = () => {
  return (
    <div className="react-container">
      {Object.keys(REACTION_POST).map((item: any) => {
        const { text, icon } = REACTION_POST[item];
        return (
          <span key={text}>
            <img src={icon} alt="" />
          </span>
        );
      })}
    </div>
  );
};

export default memo(Reaction);
