// const { authService } = require("../../services/auth/index");
const { HTTP_STATUS_CODE } = require("../../libs/constant");
const { User } = require("../../models/user");
const registration = async (req, res) => {
  const user = await User.create(req.body);
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODE.CREATED,
    data: { ...user },
  });
};

const login = async (req, res) => {};
const logout = async (req, res) => {};

module.exports = { registration, login, logout };
