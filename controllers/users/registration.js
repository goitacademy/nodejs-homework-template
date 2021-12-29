import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/userAuth/authService";
const AuthServiceReg = new AuthService();

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await AuthServiceReg.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email in use",
    });
  }
  const data = await AuthServiceReg.create(req.body);
  res.status(HttpCode.OK).json({ status: "success", code: HttpCode.OK, data });
};

export default registration;
