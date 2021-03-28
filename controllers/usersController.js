const fs = require("fs").promises;
const path = require("path");
const UsersAPI = require("../model/usersAPI.js");
const { HttpCode } = require("../helpers/constants.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;
const Jimp = require("jimp");
const createFolder = require("../helpers/create-dir");
const { nanoid } = require("nanoid");
const EmailService = require("../services/email");

const reg = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await UsersAPI.findByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email in use",
      });
    }
    const verifyToken = nanoid();
    const emailService = new EmailService(process.env.NODE_ENV);
    await emailService.sendEmail(verifyToken, email, name);
    const newUser = await UsersAPI.create({
      ...req.body,
      verify: false,
      verifyToken,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        id: newUser.id,
        avatar: newUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UsersAPI.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword || !user.verify) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "Conflict",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await UsersAPI.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
const logout = async (req, res, next) => {
  const id = req.user.id;
  await UsersAPI.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

const current = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  const isCurrentUser = await UsersAPI.findByToken(token);

  if (!isCurrentUser) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorised",
    });
  }

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      email: isCurrentUser.email,
      subscription: isCurrentUser.subscription,
      avatar: isCurrentUser.avatarURL,
    },
  });
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const avatarUrl = await saveAvatarToStatic(req);
    await UsersAPI.updateAvatar(id, avatarUrl);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await UsersAPI.findByVerifyToken(req.params.verificationToken);
    if (user) {
      await UsersAPI.updateVerifyToken(user.id, true, null);
      return res.json({
        status: "success",
        code: HttpCode.OK,
        message: "Succesfully verified!",
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Link is not valid",
    });
  } catch (error) {
    next(error);
  }
};

const saveAvatarToStatic = async (req) => {
  const id = req.user.id;
  const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolder(path.join(AVATARS_OF_USERS, id));
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
  const avatarUrl = path.normalize(path.join(id, newNameAvatar));
  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatarURL)
    );
  } catch (error) {
    console.log(error.message);
  }
  return avatarUrl;
};

module.exports = { reg, login, logout, current, avatars, verify };
