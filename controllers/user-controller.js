const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const Users = require("../model/users");
const createFolderExist = require("../helpers/create-dir");

const { HttpCode } = require("../helpers/constants");

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email in use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Email or password is wrong",
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
        email,
      },
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json();
  } catch (e) {
    next(e);
  }
};

const userCurrent = async (req, res, next) => {
  try {
    const { id, email, name, avatar } = req.user;
    const user = await Users.findById(id);
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Not authorized",
      });
    }
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        name,
        email,
        avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    const pathFile = req.file.path;
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
    const img = await Jimp.read(pathFile);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
    await createFolderExist(path.join("public", AVATARS_OF_USERS, id));
    await fs.rename(
      pathFile,
      path.join("public", AVATARS_OF_USERS, id, newNameAvatar)
    );
    const avatarUrl = path.normalize(path.join(id, newNameAvatar));
    try {
      fs.unlink(
        path.join(process.cwd(), "public", AVATARS_OF_USERS, req.user.avatar)
      );
    } catch (e) {
      console.log(e.message);
    }
    await Users.updateAvatar(id, avatarUrl);
    return res.json({
      status: "succes",
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  reg,
  login,
  logout,
  userCurrent,
  avatars,
};
