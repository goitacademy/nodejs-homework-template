const { UserService, AuthService } = require("../services");
const { HttpCode } = require("../helpers/constants");

const serviceUser = new UserService();
const serviceAuth = new AuthService();

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  const user = await serviceUser.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      message: "Email in use",
    });
  }

  try {
    const newUser = await serviceUser.addUser({
      email,
      password,
      subscription,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      user: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await serviceAuth.login({
      email,
      password,
    });

    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        user: {
          token,
        },
      });
    }

    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const userId = req.user.id;

  await serviceAuth.logout(userId);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.NO_CONTENT });
};

const current = async (req, res, next) => {
  try {
    const userToken = req.user.token;

    const user = await serviceUser.findByTokenCurrent(userToken);

    if (user) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          user,
        },
      });
    } else {
      return next({
        status: HttpCode.UNAUTHORIZED,
        mesagge: "Not authorized",
        data: "UNAUTHORIZED",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await serviceUser.updateSubscriptionStatus(
      userId,
      req.params.contactId,
      req.body
    );

    if (user) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          user,
        },
      });
    } else {
      return next({
        status: HttpCode.UNAUTHORIZED,
        mesagge: "Not authorized",
        data: "UNAUTHORIZED",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, current, updateSubscription };
