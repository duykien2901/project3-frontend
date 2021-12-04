import React from "react";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import { Link } from "react-router-dom";
import validateSchemaForgot from "src/libs/helpers/yup/forgotPassword.validate";
import { SignupWrapper } from "../signup/style";
import { Formik } from "formik";
import useUser from "src/ducks/user/hook";

const ForgotPassword: React.FC = () => {
  const { forgot } = useUser();
  return (
    <SignupWrapper>
      <div className="login-page">
        <div className="login-page-body">
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await forgot(values);
              resetForm({
                values: {
                  email: "",
                },
              });
            }}
            validationSchema={validateSchemaForgot()}
          >
            {() => {
              return (
                <Form className="login-form" layout="vertical">
                  <div className="login-title">Sign up</div>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label={"Email"}
                    name="email"
                    required
                  >
                    <Input name="email" size="large" placeholder="Email" />
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

export default ForgotPassword;
