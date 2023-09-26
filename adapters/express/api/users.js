const userService = require("../../../services/users");
const createError = require("../../../untils/createError");
const ERROR_TYPES = require("../contastants/errorTypes");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const passport = require("../../../auth/index");
const { JWT_SECRET } = require("../../../constants/env");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const avatarDir = path.join(__dirname, "../../../", "public", "avatars");
const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;
    const avatar = gravatar.url(email, {}, true);
    const passwordHash = await bcrypt.hash(body.password, 10);
    const checkEmail = await userService.findUser(email);
    if (Object.keys(checkEmail).length) {
      const error = createError(ERROR_TYPES.CONFLICT, {
        message: `CONFLICT`,
      });
      throw error;
    }
    const user = await userService.registerUser({
      ...body,
      password: passwordHash,
      avatarURL: avatar,
    });
    res.status(200).json({
      message: "user created",
    });
  } catch (e) {
    next(e);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { password, email } = body;
    const [user] = await userService.findUser(email);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!user) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "User with given email not found",
      });
      throw error;
    }
    if (!isValid) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message: `Email or password is wrong`,
      });
      throw error;
    }
    const serializedUser = user;
    delete serializedUser.password;
    const token = jwt.sign(
      { sub: serializedUser._id, role: serializedUser.role },
      JWT_SECRET,
      { expiresIn: 3600 }
    );

    res.cookie("jwt", token, { secure: true });
    res.status(200).json({
      data: {
        token,
        user,
      },
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    return res.status(204).json();
  } catch (e) {
    next(e);
  }
};
const currentUser = async (req, res, next) => {
  try {
    let user = req.user;
    if (!user) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message: "Not authorized",
      });
      throw error;
    }
    const { email, subscription } = user[0];
    res.status(200).json({
      data: {
        email,
        subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};
const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user[0];

    const { path: teamUpload, originalname } = req.file;
    const resultUpload = path.join(avatarDir, originalname);
    await fs.rename(teamUpload, resultUpload);
    const avatarUrl = path.join("avatars", originalname);
    const user = await userService.updateByUserAvatar(_id, avatarUrl);
    res.status(200).json({
      data: avatarUrl,
    });
  } catch (e) {
    next(e);
  }
};
module.exports = { registerUser, loginUser, logout, currentUser, updateAvatar };
