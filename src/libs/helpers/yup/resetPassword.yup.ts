import * as Yup from "yup";
const validateSchemaResetPass = () => {
  return Yup.object({
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

export default validateSchemaResetPass;
