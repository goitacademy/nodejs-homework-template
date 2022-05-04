const authService = require("../../services/auth");
const { HTTP_STATUS_CODE } = require("../../libs/constants");

const registration = async (req, res) => {
  const user = await authService.create(req.body);
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODE.CREATED,
    user: { ...user },
  });
};

const login = async (req, res) => {
  const token = await authService.login(req.body);
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: { ...token },
  });
};

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  return res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
};

const verify = async (req, res) => {
  const token = req.params.verificationToken;
  const user = await authService.verify(token);

  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: { message: `Verification successful. Welcome ${user.email}` },
  });
};

const reverify = async (req, res) => {
  const { email } = req.body;
  await authService.reverify(email);

  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = {
  registration,
  login,
  logout,
  verify,
  reverify,
};

export {};
