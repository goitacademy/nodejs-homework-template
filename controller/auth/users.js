const jwt = require("jsonwebtoken");
const Users = require("../../model/user");
const { Unauthorized } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

//const { User } = require("../../models");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
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
        },
      },
    });
  } catch (error) {
    next(error);
  }
};





const avatarDir = path.join(__dirname, "../../public/avatars");
const updateAvatar = async (req, res) => {
   const { path: tempPath, originalname } = req.file;

  try {
    const { _id } = req.user;
   

    const newName = `${_id.toString()}${originalname}`;
    const uploadPath = path.join(avatarDir, newName);
    const file = await Jimp.read(tempPath);

    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = `/avatars/${newName}`;

    await Users.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      status: "success",
      code: 200,
      data: {
        result: avatarURL,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};













module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateAvatar,
};
