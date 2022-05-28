const { HttpCode } = require("../../utils");
const AuthService = require("../../service/auth");
const authService = new AuthService();

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);

  // Email is already exist
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }

  const data = await authService.create(req.body);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data,
  });
};

module.exports = registration;
