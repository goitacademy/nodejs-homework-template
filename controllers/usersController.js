const fs = require("fs").promises;
const path = require("path");
const cloudinary = require("cloudinary").v2; //когда библиотека работает через кб, используем promisify
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const Users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
const createFolderIsExist = require("../helpers/create-dir");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const uploadToCloud = promisify(cloudinary.uploader.upload);

const registration = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "conflict",
        message: "Email is already used",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
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
    const isValidPassword = await user?.validatePassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORISED).json({
        status: "error",
        code: HttpCode.UNAUTHORISED,
        data: "Unauthorised",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30h" });
    await Users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

const updateSubscriptionById = async (req, res, next) => {
  try {
    // const id = req.user.id;
    const id = req.params.id;
    console.log(
      "🚀 ~ file: usersController.js ~ line 83 ~ updateSubscriptionById ~ id",
      id
    );

    const { subscription } = await Users.updateSubscription(id, req.body);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        subscription,
        message: `Greetings with changeing your subscription to ${[
          subscription,
        ]}`,
      },
    });
  } catch (e) {
    next(e);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const avatarUrl = await saveAvatarToStatic(req); // вариант через статику - загрузка на HD
    await Users.updateAvatar(id, avatarUrl); // вариант через статику - загрузка на HD
    // const { idCloudAvatar, avatarUrl } = await saveAvatarToCloud(req); // вариант через облако cloudinary
    // await Users.updateAvatar(id, avatarUrl, idCloudAvatar); // вариант через облако cloudinary
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    // console.log(error.message);
    next(error);
  }
};

const saveAvatarToStatic = async (req, res, next) => {
  const id = req.user.id;
  const AVATARS = process.env.AVATARS;
  const pathFile = req.file.path; //от мультера берем path
  const avatarNewName = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(AVATARS, id));
  await fs.rename(pathFile, path.join(AVATARS, id, avatarNewName));
  const avatarUrl = path.normalize(path.join(id, avatarNewName));
  try {
    fs.unlink(path.join(process.cwd(), AVATARS, req.user.avatar));
  } catch (error) {
    console.log(error.message);
  }
  return avatarUrl;
};

const saveAvatarToCloud = async (req, _res, _next) => {
  const pathFile = req.file.path; //от мультера берем path
  const {
    public_id: idCloudAvatar,
    secure_url: avatarUrl,
  } = await uploadToCloud(pathFile, {
    public_id: req.user.idCloudAvatar?.replace("Avatars/", ""),
    folder: "Avatars",
    transformation: { width: 250, height: 250, crop: "pad" },
  });
  await fs.unlink(pathFile);
  return { idCloudAvatar, avatarUrl };
};

module.exports = {
  registration,
  login,
  logout,
  updateSubscriptionById,
  avatars,
};
