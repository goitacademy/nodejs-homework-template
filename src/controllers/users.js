const { AuthService, UsersService } = require("../service");
const { HttpCode } = require("../helpers/constants");
const { getSuccesObject } = require("./controllersFunction");

const serviseUser = new UsersService();
const serviseAuth = new AuthService();

const reg = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await serviseUser.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = await serviseUser.create({
      email,
      password,
      subscription,
    });
    return res.status(HttpCode.CREATED).json(
      getSuccesObject(
        {
          email: newUser.email,
          subscription: newUser.subscription,
        },
        HttpCode.CREATED
      )
    );
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await serviseAuth.login({ email, password });
    if (token) {
      return res.status(HttpCode.OK).json(
        getSuccesObject(
          {
            token,
          },
          HttpCode.OK
        )
      );
    }

    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Invalide credentials",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await serviseAuth.logout(id);
  return res
    .status(HttpCode.NO_CONTENT)
    .json(getSuccesObject(null, HttpCode.NO_CONTENT));
};

const update = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await serviseUser.update(id, req.body);
    if (user) {
      res.status(HttpCode.OK).json(getSuccesObject(user));
    } else {
      return next(getErrorObject());
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { reg, login, logout, update };
