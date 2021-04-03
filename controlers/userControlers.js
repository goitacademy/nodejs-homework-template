const { HttpCode } = require("../helpers/constants");
const {
  createUserService,
  findUserByEmailService,
  findUserByIdService,
} = require("../model/userServices");

const { login, logout } = require("../model/authServices");

const userSingupControler = async (req, res, next) => {
  const { password, email, subscription } = req.body;
  const user = await findUserByEmailService(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = await createUserService({ password, email, subscription });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};
const userLoginControler = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const token = await login({ password, email });
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
const userLogoutControler = async (req, res, next) => {
  const id = req.user.id;
  await logout(id);
  return res.status(HttpCode.NO_CONTENT).json({
    status: "success",
    code: HttpCode.NO_CONTENT,
  });
};

const getCurrentUserControler = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await findUserByIdService(id);
    if (user) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLoginControler,
  userLogoutControler,
  userSingupControler,
  getCurrentUserControler,
};
