import * as Yup from "yup";
const validateSchemaForgot = () =>
  Yup.object({
    email: Yup.string()
      .email("Input must be a email")
      .max(50)
      .required("Email is required"),
  });

export default validateSchemaForgot;
