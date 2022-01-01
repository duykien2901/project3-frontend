import React, { useEffect } from "react";
import { ResultWrapper, SignupWrapper } from "src/components/signup/style";
import tick from "src/assets/img/tick-xanh.png";
import iconError from "src/assets/img/error.png";
import { Link } from "react-router-dom";
import { Button, Spin } from "antd";
import useUser from "src/ducks/user/hook";

const Verify: React.FC = () => {
  const { loading, verifyAccount, error, verifyChangeMail } = useUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search: any = new URLSearchParams(window.location.search);

  useEffect(() => {
    const search: any = new URLSearchParams(window.location.search);
    search && !search.get("mail")
      ? verifyAccount({ userId: search.get("accept") })
      : verifyChangeMail({
          userId: search.get("accept"),
          email: decodeURIComponent(search.get("mail")),
        });
  }, [verifyAccount, verifyChangeMail]);

  return (
    <SignupWrapper>
      <div className="login-page">
        <div className="login-page-body">
          {loading ? (
            <Spin />
          ) : (
            <ResultWrapper>
              <div className="tick">
                <img src={!error ? tick : iconError} alt="tick-success" />
              </div>
              <div className="content">
                <div className="title">
                  {!error
                    ? search.get("mail")
                      ? "Change mail Successfully"
                      : "Register successfully"
                    : "Something went wrong"}
                </div>
              </div>
              <div className="btn">
                <Link to="/login">
                  <Button type="primary">Go to login</Button>
                </Link>
              </div>
            </ResultWrapper>
          )}
        </div>
      </div>
    </SignupWrapper>
  );
};
export default Verify;
