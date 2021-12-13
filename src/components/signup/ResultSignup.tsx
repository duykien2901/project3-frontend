import React from "react";
import { ResultWrapper } from "src/components/signup/style";
import tick from "src/assets/img/tick-xanh.png";
import { Button } from "antd";
import { Link } from "react-router-dom";
import useUser from "src/ducks/user/hook";

const ResultSignup: React.FC<{ email: string }> = ({ email }) => {
  const { resendMail } = useUser();
  return (
    <ResultWrapper>
      <div className="tick">
        <img src={tick} alt="tick-success" />
      </div>
      <div className="content">
        <div className="title">Registration Completed</div>
        <div>
          Check Your Email To Activate Your Account If you did not receive this
          email, please check your junk/spam folder.
        </div>
      </div>
      <div className="btn">
        <Link to="/login">
          <Button type="primary">Go to login</Button>
        </Link>

        <Button
          onClick={() => {
            resendMail(email);
          }}
        >
          resent-mail
        </Button>
      </div>
    </ResultWrapper>
  );
};

export default ResultSignup;
