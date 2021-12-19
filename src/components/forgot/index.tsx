import React from "react";
import ComfirmPassword from "src/components/forgot/ComfirmPassword";
import ForgotPassword from "src/components/forgot/ForgotPassword";

const ForgotPasswordWrapper: React.FC = () => {
  const accept: string =
    new URLSearchParams(window.location.search).get("accept") || "";
  return !accept ? <ForgotPassword /> : <ComfirmPassword userId={accept} />;
};

export default ForgotPasswordWrapper;
