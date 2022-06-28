const { authService } = require("../services");
const { emailService } = require("../services");
// const { userService } = require('../services');
const { createError } = require("../helpers/errors");
const { User } = require("../models/user");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    console.log("user", user);
    await emailService.sendEmail(user.email, user.verificationToken);

    return res.status(201).json({
      email: user.email,
      subscription: user.subscription,
      id: user._id,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
    res.json(token);
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const confirm = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw createError(404, "User not found");
    }

    const result = await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      code: 200,
      message: "Email was confirmed",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, 'User was not found');
    }

    await emailService.sendEmail(user.email, user.verificationToken);
    return res.status(200).json({
      code: 200,
      message: 'check your email'
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  confirm,
  resend,
};
