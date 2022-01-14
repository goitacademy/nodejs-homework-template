import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

const signupController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "success",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  const data = await authService.create(req.body);
  res.status(HttpCode.OK).json({ status: "success", code: HttpCode.OK, data });
} catch(err){
  next(err)
}
};

export default signupController;