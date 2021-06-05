require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../model/users.model");
const { HttpCode } = require("../helpers/constants");
const UploadAvatar = require("../services/upload-avatars");

require("dotenv").config();
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

const register = async (req, res, next) => {
  try {
    const checksUser = await User.fyndByEmail(req.body.email);

    if (checksUser) {
      return res.status(HttpCode.CONFLICT).json({
        status: "Conflict",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }
    const newUser = await User.createUser(req.body);
    const { email, subscription } = newUser;
    return res.status(HttpCode.CREATED).json({
      status: "Created",
      code: HttpCode.CREATED,
      data: { user: { email, subscription } },
    });
  } catch (e) {
    next(e.message);
  }
};

const login = async (req, res, next) => {
  try {
    const checksUser = await User.fyndByEmail(req.body.email);
    const checksPassword = await checksUser?.validPassword(req.body.password);
    if (!checksUser || !checksPassword) {
      return res.status(HttpCode.UNAUTORIZED).json({
        status: "Unauthorized",
        code: HttpCode.UNAUTORIZED,
        message: "Email or password is wrong",
      });
    }

    const payload = { id: checksUser.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24h" });
    await User.updateToken(checksUser.id, token);
    const { email, subscription } = checksUser;
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { token, user: { email, subscription } },
    });
  } catch (err) {
    next(err.message);
  }
};

const logout = async (req, res, _next) => {
  try {
    await User.updateToken(req.user.id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (err) {
    return res.status(HttpCode.UNAUTORIZED).json({
      status: "unautorized",
      code: HttpCode.UNAUTORIZED,
      message: "Not authorized",
    });
  }
};

const getCurrentUser = async (req, res, next) => {
  const currentUserId = req.user.id;

  try {
    if (currentUserId) {
      const currentUser = await User.fyndById(currentUserId);
      const { email, subscription } = currentUser;

      return res.status(HttpCode.OK).json({ user: email, subscription });
    }
    return res.status(HttpCode.UNAUTORIZED).json({
      status: "unautorized",
      code: HttpCode.UNAUTORIZED,
      message: "Not authorized",
    });
  } catch (err) {
    next(err.message);
  }
};

const subscriptionUpdate = async (req, res, next) => {
  const currentUserId = req.user.id;

  try {
    if (req.body && currentUserId) {
      const result = await User.updateSubscription(currentUserId, req.body);

      const { subscription, email } = result;

      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { subscription, email },
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "subscription was not updated",
    });
    // const currentUser = await User.fyndById(currentUserId);
  } catch (err) {
    next(err.message);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatar(AVATAR_OF_USERS);

    const avatar = await uploads.saveAvatarToStatic({
      idUser: id,
      pathFile: req.file.path,
      name: req.file.filename,
      oldFile: req.user.avatar,
    });

    await User.updateAvatar(id, avatar);

    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatar },
    });
  } catch (err) {
    //  console.log("catch");
    next(err.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  subscriptionUpdate,
  avatars,
};
