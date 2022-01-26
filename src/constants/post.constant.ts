import sadIcon from "src/assets/img/sad.svg";
import likeNewIcon from "src/assets/img/like-new.svg";
import hahaIcon from "src/assets/img/haha.svg";
import argryIcon from "src/assets/img/angry.svg";
import careIcon from "src/assets/img/care.svg";
import loveIcon from "src/assets/img/love.svg";
import wowIcon from "src/assets/img/wow.svg";

export const PAGINATION = {
  LIMIT: 5,
  OFFSET: 5,
};

export const REACTION_POST: Record<string, any> = {
  LIKE: {
    value: 1,
    text: "Thích",
    icon: likeNewIcon,
    color: "#2078f4",
  },
  SAD: {
    value: 2,
    text: "Buồn",
    icon: sadIcon,
    color: "#f7b125",
  },
  ARGRY: {
    value: 3,
    text: "Phẫn nộ",
    icon: argryIcon,
    color: "#e9710f",
  },
  LOVE: {
    value: 4,
    text: "Yêu thích",
    icon: loveIcon,
    color: "#f33e58",
  },
  HAHA: {
    value: 5,
    text: "Haha",
    icon: hahaIcon,
    color: "#f7b125",
  },
  CARE: {
    value: 6,
    text: "Thương thương",
    icon: careIcon,
    color: "#f7b125",
  },
  WOW: {
    value: 7,
    text: "Wow",
    icon: wowIcon,
    color: "#f7b125",
  },
};
