import React from "react";
import { BaseButtonWrapper } from "./base-button";
interface ButtonProps {
  iconCss: string;
  text: string;
  btnStyle: string;
  btnClick?: Function;
}
const BaseButton: React.FC<ButtonProps> = ({
  iconCss,
  text,
  btnStyle,
  btnClick = () => {},
}) => {
  return (
    <BaseButtonWrapper>
      <button
        className={"btn fb-flex fb-align-center fb-justify-center " + btnStyle}
        onClick={() => btnClick()}
      >
        <span
          className={
            "icon fb-flex fb-align-center fb-justify-center " + iconCss
          }
        ></span>
        <span className="text fb-flex fb-align-center fb-justify-center">
          {text}
        </span>
      </button>
    </BaseButtonWrapper>
  );
};

export default BaseButton;
