import React, { memo } from "react";

import sadIcon from "src/assets/img/sad.svg";
import likeNewIcon from "src/assets/img/like-new.svg";
import hahaIcon from "src/assets/img/haha.svg";
import argryIcon from "src/assets/img/angry.svg";
import careIcon from "src/assets/img/care.svg";
import loveIcon from "src/assets/img/love.svg";

const Reaction: React.FC = () => {
  return (
    <div className="react-container">
      <span>
        <img src={likeNewIcon} alt="" />
      </span>
      <span>
        <img src={sadIcon} alt="" />
      </span>
      <span>
        <img src={argryIcon} alt="" />
      </span>
      <span>
        <img src={loveIcon} alt="" />
      </span>
      <span>
        <img src={hahaIcon} alt="" />
      </span>
      <span>
        <img src={careIcon} alt="" />
      </span>
    </div>
  );
};

export default memo(Reaction);
