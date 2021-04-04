const AuthService = require("../model/authServices");
const UserService = require("../model/userServices");
const { HttpCode } = require("../helpers/constants");

const servisAuth = new AuthService();
const servisUser = new UserService();

const reg = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await servisUser.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "Email in use",
    });
  }

  try {
    const newUser = await servisUser.create({
      name,
      email,
      password,
      subscription,
      // avatarURL,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await servisAuth.login({ email, password });
    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          token,
        },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  const id = req.user.id;
  await servisAuth.logout(id);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.NO_CONTENT });
};

const avatars = async (req, res, next) => {
  const { id } = req.user;
  const pathFile = req.file.path;

  const url = await servisUser.updateAvatar(id, pathFile);
  return res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, avatarURL: url });
};

module.exports = {
  reg,
  login,
  logout,
  avatars,
};
