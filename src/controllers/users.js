const { UserService, AuthService } = require("../services");
const { HttpCode } = require("../helpers/constants");

//
const fs = require("fs/promises");
const path = require("path");
const { UploadService } = require("../services/local-upload");
const { UsersReporitory } = require("../repository");
require("dotenv").config();
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
const newUserRepo = new UsersReporitory();
//

const serviceUser = new UserService();
const serviceAuth = new AuthService();

const signup = async (req, res, next) => {
  const { email, password, subscription, avatarURL } = req.body;

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
      avatarURL,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      user: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
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

// const avatars = async (req, res, next) => {
//   try {
//     const id = req.user.id;
//     const pathFile = req.file.path;
//     const avatarUrl = await serviceUser.updateAvatar(id, pathFile);

//     return res.json({
//       status: "success",
//       code: HttpCode.CREATED,
//       data: { avatarUrl },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadService(AVATAR_OF_USERS);
    const avatarUri = await uploads.saveAvatar({ idUser: id, file: req.file });

    try {
      await fs.unlink(path.join(AVATAR_OF_USERS, req.user.avatarURL));
    } catch (e) {
      console.log(e.mesagge);
    }

    await newUserRepo.updateAvatar(id, avatarUri);

    return res.json({
      status: "success",
      code: HttpCode.CREATED,
      data: { avatarUri },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  avatars,
};
