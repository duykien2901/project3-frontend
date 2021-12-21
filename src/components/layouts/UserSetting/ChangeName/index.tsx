import { Formik } from "formik";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import React, { memo } from "react";
import useUser from "src/ducks/user/hook";
import { ModalChangeWrapper } from "../../style";
import * as Yup from "yup";
import { User } from "src/ducks/user";

type NameProp = {
  isVisibleNameSetting: boolean;
  setIsVisibleNameSetting: (isVisibleNameSetting: boolean) => void;
  user: User | null;
};

const ChangeName: React.FC<NameProp> = ({
  isVisibleNameSetting,
  setIsVisibleNameSetting,
  user,
}) => {
  const { changeAccount } = useUser();
  return (
    <ModalChangeWrapper
      title="Thay đổi tên"
      visible={isVisibleNameSetting}
      footer={false}
      onCancel={() => setIsVisibleNameSetting(false)}
    >
      <Formik
        initialValues={{
          name: user?.name,
        }}
        onSubmit={async (values, { resetForm }) => {
          await changeAccount(values);
          setIsVisibleNameSetting(false);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Tên không để trống"),
        })}
      >
        {() => {
          return (
            <Form className="login-form" layout="vertical">
              <FormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label={"Tên"}
                name="name"
                required
              >
                <Input name="name" size="large" placeholder="Name" />
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

export default memo(ChangeName);
