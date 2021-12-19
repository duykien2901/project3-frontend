import * as Yup from "yup";
const validateSchemaSignup = () => {
  return Yup.object({
    name: Yup.string().required("name is required").label("Name").max(50),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a email")
      .max(50)
      .label("Email"),
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

export default validateSchemaSignup;
