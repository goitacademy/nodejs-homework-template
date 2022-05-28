const { HttpCode } = require("../../utils");
const AuthService = require("../../service/auth");
const authService = new AuthService();

const currentUser = async (req, res, next) => {
  const bearerHearder = req.headers.authorization;

  if (typeof bearerHearder === "undefined") {
    res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
    return;
  }

  const bearer = bearerHearder.split(" ");
  const token = bearer[1];

  const data = await authService.getCurrentDataFromToken(token);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { user: { ...data } },
  });
};

module.exports = currentUser;
