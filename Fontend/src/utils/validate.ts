import * as yup from "yup";

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required("Xác nhận mật khẩu không được để trống.")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,160}$/, "Vui lòng nhập mật khẩu hợp lệ.")
    .oneOf([yup.ref(refString)], "Nhập lại mật khẩu không khớp.");
};
const schema = yup.object({
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^([A-Za-z0-9]([\.]?[A-Za-z0-9_\-])*)\@[a-zA-Z0-9][_\-a-zA-Z0-9]{4,159}(\.[a-zA-Z0-9][_\-a-zA-Z0-9]*)+$/,
      "Vui lòng nhập địa chỉ email hợp lệ."
    ),
  password: yup
    .string()
    .required("Mật khẩu không được để trống.")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,160}$/, "Vui lòng nhập mật khẩu hợp lệ."),
  confirm_password: handleConfirmPasswordYup("password")
});

export const schemaLogin = schema.omit(["confirm_password"]);
export type SchemaLogin = yup.InferType<typeof schemaLogin>;
export const schemaRegister = schema;
export type SchemaRegister = yup.InferType<typeof schemaRegister>;
