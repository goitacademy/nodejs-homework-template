const service = require("../service/users");
const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");
require("dotenv").config();
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { imageStore } = require("../middlewares/upload");
const { HttpError } = require("../helpers/HttpError");
const secret = process.env.SECRET;

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await service.getUser({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const avatarURL = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const newUser = new User({ email, password, subscription, avatarURL });
    const newUser = new User({ email, password, subscription });

    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUser({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Incorrect email or password",
      data: "Unauthorized",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  user.setToken(token);
  await user.save();
  res.status(200).json({
  res.json({
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
};

const logout = async (req, res, next) => {
  try {
    const user = await service.getUser({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      user.setToken(null);
      await user.save();
      res.json({
        status: "success",
        code: 204,
        data: {
          message: "No content",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await service.getUser({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          user,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  const { email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${email}`,
    },
  });
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { userId } = req.params;

    if (!subscription) {
      res.status(400).json({ message: "missing field subscription" });
    }
    const user = await service.updateUserSubscription(userId, subscription);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempPath, filename } = req.file;

    const avatar = await Jimp.read(tempPath);
    await avatar
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempPath);

    const avatarName = `${_id}_${filename}`;
    const resultUpload = path.join(imageStore, avatarName);
    await fs.rename(tempPath, resultUpload);
    const avatarURL = path.join("avatars", avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });
    if (!avatarURL) {
      throw HttpError(404, "Missing field avatar");
    }

    return res.status(200).json({ code: 200, avatarURL });
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

const deleteUserByMail = async (req, res) => {
  try {
    const email = req.query.email;
    const userToRemove = await service.deleteUser(email);
    if (!userToRemove) {
      return res.status(404).json({ message: "Not found user" });
    } else {
      res.status(200).json({ message: "User deleted from data base" });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
  getUsers,
  updateSubscription,
  updateAvatar,
  deleteUserByMail,
};