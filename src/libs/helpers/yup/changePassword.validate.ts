import * as Yup from "yup";

const validateSchemaChangePass = () => {
  return Yup.object({
    currentPassword: Yup.string()
      .required("Current Password is required")
      .max(50)
      .label("Current Password"),
    password: Yup.string()
      .required("Password is required")
      .max(50)
      .label("Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password is not match")
      .label("Confirm Password")
      .max(50),
  });
};

export default validateSchemaChangePass;
