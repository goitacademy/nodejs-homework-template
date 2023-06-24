const { User } = require("../models/users");
const { emailValidator } = require("../validators/validators");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = await emailValidator(email);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "User already exists!",
    });
  }

  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.avatarURL = gravatar.url(email, {
      protocol: "http",
      s: "250",
      r: "pg",
    });

    await newUser.save();

    res.json({
      status: "Created",
      code: 201,
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = await emailValidator(email);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  user.token = token;
  await user.save();

  res.json({
    status: "success",
    code: 200,
    token: token,
    user: {
      email: email,
      subscription: user.subscription,
    },
  });
};

const getUserDetails = async (req, res, next) => {
  try {
    const user = req.user;
    const { email, subscription } = user;
    res.json({
      status: "OK",
      code: 200,
      ResponseBody: {
        email,
        subscription,
      },
    });
  } catch {
    next(error);
  }
};

const logOutUser = async (req, res, next) => {
  try {
    req.user.token = null;

    await req.user.save();
    res.status(204).json();
  } catch {
    next(error);
  }
};

// Resize images
const resizeImages = (sourceImagePath, outputImagePath) => {
  Jimp.read(sourceImagePath)
    .then((image) => {
      return image.resize(250, 250).quality(90).write(outputImagePath);
    })
    .then(() => {
      console.log("Image resize and saved.");
    })
    .then(() => {
      fs.unlink(sourceImagePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Old photo deleted");
        }
      });
    })
    .catch((err) => {
      console.error("An error occurred :", err);
    });
};

const uploadAvatar = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No image found.");
  }
  const user = req.user;

  const { path: newPath, filename } = req.file;

  try {
    const sourceImagePath = newPath;
    const outputImagePath = path.join(
      __dirname,
      `../public/avatar/${filename}`
    );

    resizeImages(sourceImagePath, outputImagePath);

    user.avatarURL = filename;
    await user.save();
  } catch (err) {
    return next(err);
  }
  res.status(200).json({ avatarURL: `${filename} saved as a user avatar URL` });
};

module.exports = {
  userRegister,
  logIn,
  getUserDetails,
  logOutUser,
  uploadAvatar,
};
