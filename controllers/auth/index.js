const { authService } = require("../../services/auth/index");
const { HTTP_STATUS_CODE } = require("../../libs/constant");
const register = async (req, res) => {
  const user = await authService.register(req.body);
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODE.CREATED,
    payload: { user },
  });
};

const login = async (req, res) => {
  const token = await authService.login(req.body);
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { token },
  });
};
const logout = async (req, res) => {
  await authService.logout(req.user.id);
  return res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
};

module.exports = { register, login, logout };
