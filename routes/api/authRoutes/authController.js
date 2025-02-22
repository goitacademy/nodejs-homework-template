const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const jimp = require("jimp");

const User = require("../../../models/userModel");
const { HttpError } = require("../../../onError");
const { SECRET_KEY } = process.env;
const storeImage = path.resolve("public", "avatars");

class AuthController {
  userRegister = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = await gravatar.url(email, { s: "200" });
    try {
      const newUser = await User.create({
        ...req.body,
        avatarURL: avatar,
        password: hashPassword,
      });

      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
          email: newUser.email,
          avatarURL: newUser.avatarURL,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  userLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      throw HttpError(401);
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword);
    if (!checkPassword) {
      throw HttpError(401);
    }
    const { id } = user;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });
    res.json({
      token,
    });
  });

  userLogout = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
      message: "Logout success",
    });
  });

  userCurrent = asyncHandler(async (req, res, next) => {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  });

  updateAvatar = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { path: temporaryName, filename: newFileName } = req.file;

    const fileName = path.join(storeImage, newFileName);

    try {
      const img = await jimp.read(temporaryName);
      await img
        .autocrop()
        .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER)
        .writeAsync(temporaryName);
      await fs.rename(temporaryName, fileName);
      await User.findByIdAndUpdate(_id, { avatarURL: fileName });
      res.status(200);
      res.json(`avatar changed to ${fileName}`);
    } catch (error) {
      fs.unlink(temporaryName);
      next(error);
    }
  });
}

module.exports = new AuthController();
