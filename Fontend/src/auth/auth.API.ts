import fetHandler from "src/configs/configAxios";
import { BaseResponseAPI, ILogin } from "./models";

export const LoginAccount = (body: ILogin) => {
  return fetHandler.post<BaseResponseAPI>("/api/authentication/login", body);
};
