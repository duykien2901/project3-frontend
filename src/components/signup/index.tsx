import React from "react";
import { Formik } from "formik";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import { Link } from "react-router-dom";
import useUser from "src/ducks/user/hook";
import { SignupWrapper } from "./style";
import validateSchemaSignup from "src/libs/helpers/yup/signup.validate";
import ResultSignup from "src/components/signup/ResultSignup";

const SignUpPage: React.FC = () => {
  const { signup, signupSuceed, email } = useUser();
  return (
    <SignupWrapper>
      <div className="login-page">
        <div className="login-page-body">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await signup(values);
              // resetForm({
              //   values: {
              //     name: "",
              //     username: "",
              //     password: "",
              //     confirmPassword: "",
              //   },
              // });
            }}
            validationSchema={validateSchemaSignup()}
          >
            {() => {
              return signupSuceed ? (
                <ResultSignup email={email} />
              ) : (
                <Form className="login-form" layout="vertical">
                  <div className="login-title">Sign up</div>

                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label={"Name"}
                    name="name"
                    required
                  >
                    <Input name="name" size="large" placeholder="Name" />
                  </FormItem>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label={"Username"}
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
                    Sign up
                  </SubmitButton>
                  <div className="link-signup">
                    <Link to="/login">Have a account? Sign in</Link>
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

export default SignUpPage;
