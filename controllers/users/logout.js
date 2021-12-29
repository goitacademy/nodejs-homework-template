import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/userAuth/authService";
const authServiceLogout = new AuthService();

const logout = async (req, res, next) => {
  await authServiceLogout.setToken(req.user.id, null);
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.OK, data: {} });
};
export default logout;
