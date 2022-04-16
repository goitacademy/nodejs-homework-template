const authService = require("../../services/auth/index");
const { HTTP_STATUS_CODE } = require("../../libs/constant");

const registration = async (req, res) => {
  const user = await authService.create(req.body);
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODE.CREATED,
    data: { ...user },
  });
};

const login = async (req, res) => {
  const token = await authService.login(req.body);
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: { token },
  });
};

const logout = async (req, res) => {};

module.exports = { registration, login, logout };
