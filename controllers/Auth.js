const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const User = require("../models/User");

const path = require("path");
const Jimp = require("jimp");

require("dotenv").config();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const registeredUsed = await User.findOne({ email });
  try {
    if (registeredUsed) {
      res.status(409).json({
        message: "Email in use",
      });
    } else {
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          email,
          password: hash,
        }).then((user) =>
          res.status(201).json({
            message: "User successfully created",
            user,
          })
        );
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "User not successful created",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const registeredUser = await User.findOne({ email });
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }
  if (!registeredUser) {
    res.status(401).json({
      message: "Login not successful",
      error: "User not found",
    });
  }
  const isValidPassword = await bcrypt.compare(
    password,
    registeredUser.password
  );
  if (!isValidPassword) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
  const payload = { id: registeredUser._id };
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  await User.findByIdAndUpdate(registeredUser._id, { token });
  res.status(200).json({
    token,
    registeredUser,
  });
};

exports.update = async (req, res) => {
  const { subscription, _id } = req.body;
  const subscriptions = ["starter", "pro", "business"];

  if (!subscriptions.includes(subscription)) {
    res.status(400).json({ message: "There is no such subscription" });
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.status(200).json({
    message: "Update successfull",
    data: subscription,
    updatedUser,
  });
};
exports.getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};
exports.logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204);
};
exports.updateAvatar = async (req, res, next) => {
  const { user } = req;
  const { filename, path: filepath } = req.file;
  const tmpPath = await path.resolve(__dirname, "../tmp", filename);
  const publicPath = await path.resolve(
    __dirname,
    "../public/avatars",
    filename
  );
  try {
    const img = await Jimp.read(filepath);
    await img.resize(250, 250).writeAsync(filepath);
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    console.log(error.message);
    await fs.unlink(tmpPath);
    throw HttpError(error.status, error.message);
  }
  const avatarsPath = `/public/avatars/${filename}`;
  const updateUser = await User.findByIdAndUpdate(
    user._id,
    { avatarURL: avatarsPath },
    { new: true }
  );
  return res.status(200).json({
    data: {
      user: {
        imageUrl: updateUser.avatarURL,
      },
    },
  });
};
