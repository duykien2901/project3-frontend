import { Formik } from "formik";
import React from "react";
import { SignupWrapper } from "src/components/signup/style";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import validateSchema from "src/libs/helpers/yup/login.validate";
import { Link } from "react-router-dom";
import useUser from "src/ducks/user/hook";
import validateSchemaSignup from "src/libs/helpers/yup/signup.validate";
import validateSchemaResetPass from "src/libs/helpers/yup/resetPassword.yup";

const ComfirmPassword: React.FC<{ userId: string }> = ({ userId }) => {
  const { changePassword } = useUser();
  return (
    <SignupWrapper>
      <div className="login-page">
        <div className="login-page-body">
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await changePassword({ password: values.password, userId });
              resetForm({
                values: {
                  password: "",
                  confirmPassword: "",
                },
              });
            }}
            validationSchema={validateSchemaResetPass()}
          >
            {() => {
              return (
                <Form className="login-form" layout="vertical">
                  <div className="login-title">Change password</div>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label={"Password"}
                    name="password"
                    required
                  >
                    <Input.Password
                      size="large"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Password"
                    />
                  </FormItem>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label={"Confirm password"}
                    name="confirmPassword"
                    required
                  >
                    <Input.Password
                      size="large"
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                    />
                  </FormItem>
                  <SubmitButton
                    className="btn-login"
                    type="primary"
                    size="large"
                  >
                    Send
                  </SubmitButton>
                  <div className="link-signup">
                    <Link to="/login">Go to login</Link>
                  </div>
                  <div className="link-signup">
                    <Link to="/signup">Have a account? Sign in</Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </SignupWrapper>
  );
};

export default ComfirmPassword;
