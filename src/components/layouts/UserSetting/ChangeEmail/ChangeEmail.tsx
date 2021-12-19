import { Formik } from "formik";
import React from "react";
import { User } from "src/ducks/user";
import { ModalNameWrapper } from "../../style";
import * as Yup from "yup";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";
import useUser from "src/ducks/user/hook";

type EmailProp = {
  isVisibleEmailSetting: boolean;
  setIsVisibleEmailSetting: (isVisibleNameSetting: boolean) => void;
  user: User | null;
};

const ChangeEmail: React.FC<EmailProp> = ({
  user,
  isVisibleEmailSetting,
  setIsVisibleEmailSetting,
}) => {
  const { changeAccount } = useUser();
  return (
    <ModalNameWrapper
      title="Thay đổi Email"
      visible={isVisibleEmailSetting}
      footer={false}
      onCancel={() => setIsVisibleEmailSetting(false)}
    >
      <Formik
        initialValues={{
          email: user?.email,
        }}
        onSubmit={async (values, { resetForm }) => {
          await changeAccount(values, user?.id);
          setIsVisibleEmailSetting(false);
          resetForm({
            values: {
              email: user?.email,
            },
          });
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Email phải đúng định dạng")
            .required("Email không để trống"),
        })}
      >
        {() => {
          return (
            <Form className="login-form" layout="vertical">
              <FormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label={"Email"}
                name="email"
                required
              >
                <Input name="email" size="large" placeholder="Email" />
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
    </ModalNameWrapper>
  );
};

export default ChangeEmail;
