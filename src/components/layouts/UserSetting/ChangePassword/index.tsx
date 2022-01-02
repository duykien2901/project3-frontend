import { Formik } from "formik";
import React from "react";
import { User } from "src/ducks/user";
import useUser from "src/ducks/user/hook";
import { ModalChangeWrapper } from "../../style";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";
import validateSchemaChangePass from "src/libs/helpers/yup/changePassword.validate";

type PasswordProp = {
  isVisiblePasswordSetting: boolean;
  setIsVisiblePasswordSetting: (isVisibleNameSetting: boolean) => void;
  user: User | null;
};

const ChangePassword: React.FC<PasswordProp> = ({
  user,
  isVisiblePasswordSetting,
  setIsVisiblePasswordSetting,
}) => {
  const { changePassword } = useUser();
  return (
    <ModalChangeWrapper
      title="Thay đổi password"
      visible={isVisiblePasswordSetting}
      footer={false}
      onCancel={() => setIsVisiblePasswordSetting(false)}
    >
      <Formik
        initialValues={{
          currentPassword: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          // await changeAccount({ ...values, userId: user?.userId });
          await changePassword({
            currentPassword: values.currentPassword,
            password: values.password,
            userId: user?.userId,
          });
          setIsVisiblePasswordSetting(false);
          resetForm({
            values: {
              currentPassword: "",
              password: "",
              confirmPassword: "",
            },
          });
        }}
        validationSchema={validateSchemaChangePass()}
      >
        {() => {
          return (
            <Form className="login-form" layout="vertical">
              <FormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label={"Current Password"}
                name="currentPassword"
                required
              >
                <Input.Password
                  size="large"
                  name="currentPassword"
                  placeholder="Current Password"
                />
              </FormItem>
              <FormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label={"New Password"}
                name="password"
                required
              >
                <Input.Password
                  size="large"
                  name="password"
                  placeholder="New Password"
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
                  placeholder="Confirm Password"
                />
              </FormItem>
              <div className="submit-btn">
                <SubmitButton className="btn-login" type="primary">
                  Save
                </SubmitButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </ModalChangeWrapper>
  );
};

export default ChangePassword;
