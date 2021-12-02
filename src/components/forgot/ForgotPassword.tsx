import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { SignupWrapper } from "../signup/style";

const ForgotPassword: React.FC = () => {
  return (
    <SignupWrapper>
      <div className="login-page">
        <div className="login-page-body">
          {/* <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await signup(values);
              resetForm({
                values: {
                  email: "",
                },
              });
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
          </Formik> */}
          <div className="link-signup">
            <Link to="/login">Go to login</Link>
          </div>
          <div className="link-signup">
            <Link to="/signup">No account? Sign up</Link>
          </div>
        </div>
      </div>
    </SignupWrapper>
  );
};

export default ForgotPassword;
