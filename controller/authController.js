const { registration, login } = require("../services/authServices");
const createError = require("http-errors");
const { User } = require("../models/userModel");
const registerController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await registration(email, password);
    res.status(201).json({ user: { email, password } });
  } catch (e) {
    if (e.message.includes("duplicate key error collection")) {
      next(createError.Conflict("Email in use"));
    } else {
      next(createError.BadRequest(e.message));
    }
  }
};
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const userSub = user.subscription;
  try {
    const token = await login(email, password);
    res.json({ token, user: { email, subscription: userSub } });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(200).json({
      user: { email, subscription },
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const { user } = req;

    user.token = null;
    await User.findByIdAndUpdate(user._id, user);

    return res.json();
  } catch (e) {
    next(e);
  }
};
module.exports = { registerController, loginController, getCurrent, logout };
