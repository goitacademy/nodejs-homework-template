// import authService from "../../../../service/auth"
import authService from "../../../../service/auth";
import { HttpCode } from "../../../../lib/constants";

export const signup = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  const data = await authService.create(req.body);
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data,
  });
};
