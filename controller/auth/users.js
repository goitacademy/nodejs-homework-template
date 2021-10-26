const jwt = require("jsonwebtoken");
const Users = require("../../model/user");
const { User } = require("../../schemas/users");
const { Unauthorized } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const gravatar = require("gravatar");

//const { User } = require("../../models");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const avatarURL = gravatar.url(email);
    console.log(avatarURL);
    const user = await Users.findByEmail(email);
    if (user) {
      return next({
        status: 409,
        message: "Email in use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(201).json({
      user: {
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
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    const isValidPassword = await user.validPassword(password);
    if (!user || !isValidPassword) {
      throw new Unauthorized("Email or password is wrong");
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, _next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(204).json({});
};

const currentUser = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await Users.findById(id);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const uploadDir = path.join(__dirname, "../../", "public");

const updateAvatar = async (req, res) => {
  const { originalname, path: tempDir } = req.file;

  try {
    const newImageName = `${Date.now().toString()}-${req.file.originalname}`;
    const originalImage = await Jimp.read(tempDir);

    const resizedImage = await originalImage.cover(250, 250);

    await resizedImage.write(`${uploadDir}/avatars/${newImageName}`);

    fs.unlink(tempDir);

    const avatar = path.join("/avatars", newImageName);

    const { avatarURL } = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatarURL: avatar,
      },
      { new: true }
    );

    res.status(201).json({
      avatarURL,
    });
  } catch (error) {
    fs.unlink(tempDir);
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateAvatar,
};
