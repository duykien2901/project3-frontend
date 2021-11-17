import { Formik } from "formik";
import { Form } from "formik-antd";
import React from "react";
import { LoginWrapper } from "src/components/login/style";
import useUser from "src/ducks/user/hook";

const LoginPage: React.FC = () => {
  const { login } = useUser();
  return (
    <LoginWrapper>
      <div className="login-page">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            await login(values);
            resetForm({ values: { email: "", password: "" } });
          }}
        >
          {() => <Form></Form>}
        </Formik>
      </div>
    </LoginWrapper>
  );
};

export default LoginPage;
