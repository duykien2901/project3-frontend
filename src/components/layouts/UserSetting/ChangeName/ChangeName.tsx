import { Formik } from "formik";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import React from "react";
import useUser from "src/ducks/user/hook";
import { ModalNameWrapper } from "../../style";
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
    <ModalNameWrapper
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
          await changeAccount(values, user?.id);
          resetForm({
            values: {
              name: "",
            },
          });
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
                label={"Name"}
                name="name"
                required
              >
                <Input name="name" size="large" placeholder="Name" />
              </FormItem>
              <SubmitButton className="btn-login" type="primary" size="large">
                Save
              </SubmitButton>
            </Form>
          );
        }}
      </Formik>
    </ModalNameWrapper>
  );
};

export default ChangeName;
