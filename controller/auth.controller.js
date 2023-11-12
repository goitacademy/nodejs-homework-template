const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");

const { User } = require("../model/user");
const { ErrorHandling } = require("../helper/errorReq");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { password, email, subscription } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      password: hashedPassword,
      email,
      subscription,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "starter",
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw ErrorHandling(401);
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw ErrorHandling(400, "Email or password wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "No Content",
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({ email, message: "Token is valid" });
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { user } = req;

    if (!["starter", "pro", "business"].includes(subscription)) {
      throw ErrorHandling(400, "Invalid subscription value");
    }

    user.subscription = subscription;
    await user.save();

    res.status(200).json({ subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, getCurrent, updateSubscription };
