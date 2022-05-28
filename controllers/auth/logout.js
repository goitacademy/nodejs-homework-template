const { HttpCode } = require("../../utils");
const AuthService = require("../../service/auth");
const authService = new AuthService();

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({
      status: "success",
      code: HttpCode.NO_CONTENT,
      message: "You are logout successfully",
    });
};

module.exports = logout;
