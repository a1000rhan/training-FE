import * as yup from "yup";

export const signinschema = yup.object({
  // staffId:yup.number()

  // .required("Please Enter the Correct Staff ID"),

  password: yup.string(),
  // .min(1)
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //   "Minimum eight characters, at least one letter and one number"
  // )
});
export const schema = yup.object({
  // staffId: yup.number().min(2).required("Please Enter the Correct Staff ID"),

  password: yup
    .string()
    .min(1)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Minimum eight characters, at least one letter and one number"
    )
    .required("Please Enter your Password"),
  confirmPassword: yup
    .string()
    .required("Please Conform your Password")
    .oneOf([yup.ref("password")], "Password dose not Match"),
});
