const fs = require("fs/promises");
const path = require("path");
const Users = require("../model/users-methods");
const { HttpCodes, Statuses, Limits } = require("../helpers/constants");
const {
  ResponseMessages,
  ResourseNotFoundMessage,
} = require("../helpers/messages");
const UploadAvatarService = require("../services/local-upload");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email);

    if (user) {
      return res.status(HttpCodes.CONFLICT).json({
        status: Statuses.error,
        code: HttpCodes.CONFLICT,
        message: ResponseMessages.emailInUse,
      });
    }

    const { id, email, subscription, avatarURL } = await Users.createUser(
      req.body,
    );

    return res.status(HttpCodes.CREATED).json({
      status: Statuses.success,
      code: HttpCodes.CREATED,
      message: ResponseMessages.registedSuccess,
      user: {
        id,
        email,
        avatarURL,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUserByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: Statuses.error,
        code: HttpCodes.UNAUTHORIZED,
        message: ResponseMessages.loginFail,
      });
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: Limits.tokenLife,
    });
    await Users.updateToken(id, token);

    const {
      _doc: { subscription, avatarURL },
    } = user;

    return res.json({
      status: Statuses.success,
      code: HttpCodes.OK,
      message: ResponseMessages.loginSuccess,
      token,
      user: { email, avatarURL, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);

    return res.status(HttpCodes.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const { email, avatarURL, subscription } = req.user;

    return res.json({
      status: Statuses.success,
      code: HttpCodes.OK,
      user: { email, avatarURL, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user.id;
    const updatedSubscription = await Users.updateSubscription(id, req.body);

    if (!updatedSubscription) {
      return res.status(HttpCodes.NOT_FOUND).json(ResourseNotFoundMessage);
    }

    const { email, avatarURL, subscription } = updatedSubscription;

    return res.json({
      status: Statuses.success,
      code: HttpCodes.OK,
      message: ResponseMessages.subcriptionUpdatedSuccess,
      payload: { email, avatarURL, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    // Calling the service that handles the avatar file and returns its path as '/avatars/filename.extention'
    const uploads = new UploadAvatarService("avatars");
    const avatarUrl = await uploads.saveAvatar({ file: req.file });

    try {
      // Deleting previous avatar of the user (if we do not want to store all users avatars)
      // If previous avatar link is that of gravatar, the error will be handled by nearest catch,
      // but the new avatar will uploaded
      await fs.unlink(path.join("public", req.user.avatarURL));
    } catch (error) {
      console.log(error.message);
    }

    // Updating user's entity in database
    await Users.updateAvatar(id, avatarUrl);

    return res.json({
      status: Statuses.success,
      code: HttpCodes.OK,
      message: "Avatar uploaded!",
      data: { avatarUrl },
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