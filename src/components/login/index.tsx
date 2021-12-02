import { Formik } from "formik";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import React from "react";
import { Link } from "react-router-dom";
import { LoginWrapper } from "src/components/login/style";
import useUser from "src/ducks/user/hook";
import validateSchema from "src/libs/helpers/yup/login.validate";

const LoginPage: React.FC = () => {
  const { login } = useUser();
  return (
    <LoginWrapper>
      <div className="login-page">
        <div className="login-page-body">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await login(values);
              // resetForm({ values: { email: "", password: "" } });
            }}
            validationSchema={validateSchema()}
          >
            {() => (
              <Form className="login-form">
                <div className="login-title">Login</div>
                <FormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={"Email"}
                  name="email"
                  required
                >
                  <Input name="email" size="large" placeholder="Email" />
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
                    placeholder="Password"
                  />
                </FormItem>
                <SubmitButton className="btn-login" type="primary" size="large">
                  Login
                </SubmitButton>
                <div className="link-signup">
                  <Link to="/forget">Forgot password?</Link>
                </div>
                <div className="link-signup">
                  <Link to="/signup">No account? Sign Up</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default LoginPage;
