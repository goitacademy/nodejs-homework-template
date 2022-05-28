const { HttpCode } = require("../../utils");
const AuthService = require("../../service/auth");
const authService = new AuthService();

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);

  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "success",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credential",
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { token },
  });
};
module.exports = login;
