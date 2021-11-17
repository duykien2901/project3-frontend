import { Row } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import React from "react";
import { LoginWrapper } from "src/components/login/style";
import useUser from "src/ducks/user/hook";

const LoginPage: React.FC = () => {
  const { login } = useUser();
  return (
    <LoginWrapper>
      <div className="login-page">
        <div className="login-page-body">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await login(values);
              resetForm({ values: { username: "", password: "" } });
            }}
          >
            {() => (
              <Form>
                <FormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={"Username"}
                  name="email"
                  required
                >
                  <Input name="username" />
                </FormItem>
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
                  />
                </FormItem>
                <SubmitButton className="btn-login" type="primary" size="large">
                  Login User Kien
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default LoginPage;
