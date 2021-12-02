import * as Yup from "yup";
const validateSchema = () => {
  return Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("Email must be a email")
      .max(50)
      .label("Email"),
    password: Yup.string()
      .required("password is required")
      .max(50)
      .label("Password"),
  });
};

export default validateSchema;
