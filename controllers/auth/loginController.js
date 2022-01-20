import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/auth";
import { CustomError } from '../../lib/custom-error';

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await AuthService.getUser(email, password);
  if (!user) {
    throw new CustomError(HttpCode.UNAUTHORIZED, "invalid credentials")
  }
  const token = AuthService.getToken(user);
  await AuthService.setToken(user.id, token);

  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { token } });
};

export default loginController;