import authService from "../../../../service/auth";
import { HttpCode } from "../../../../lib/constants";

export const current = async (req, res, next) => {
  if (req.user.id) {
    const user = await authService.getUserById(req.user.id);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { user },
    });
  }
  return res.status(HttpCode.UNAUTHORIZED).json({
    status: "error",
    code: HttpCode.UNAUTHORIZED,
    message: "Not authorized",
  });
};
