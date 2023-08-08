const User = require("../models/usersModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const cathAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jimp = require("jimp");
const path = require("path");
const uuid = require("uuid").v4;
const fs = require("fs");

// USER REGISTRATION
exports.registrUser = cathAsync(async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashedPassword };
  const newUser = await User.create(user);
  //   newUser.password = undefined;
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});

// USER LOGIN
exports.loginUser = cathAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError(401, "Email or password is wrong");

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) throw new AppError(401, "Email or password is wrong");

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
});

// LOGOUT USER
exports.logoutUser = cathAsync(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.sendStatus(204);
});

// GET CURRENT USER
exports.currentUser = cathAsync(async (req, res) => {
  //   console.log(req.user);
  const { email, subscription } = req.user;
  const currUs = { email, subscription };

  res.status(200).json(currUs);
});

// CHANGE CURRENT USER AVATAR
exports.changeUserAvatar = catchAsync(async (req, res) => {
  // if there is no file
  if (!req.file) {
    throw new AppError(400, "File is required");
  }

  // creating avatar file in public/avatars
  const avatar = await jimp.read(req.file.path);
  const extension = req.file.mimetype.split("/")[1];
  const newNameOfImageFile = `${req.user.id}-${uuid()}.${extension}`;
  const pathOfAvatar = path.join("public", "avatars", newNameOfImageFile);
  await avatar.cover(250, 250).quality(90).writeAsync(pathOfAvatar);

  // deleting old file from tmp
  await fs.unlink(req.file.path, function (err) {
    if (err) throw new AppError(400, "File for deleting is required");
  });

  // update avatar link in db
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    {
      avatarURL: path.join("avatars", newNameOfImageFile),
    },
    { new: true }
  );

  res.status(200).json({ avatarURL: user.avatarURL });
});
