const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  try {
    const user = new User({ email, password });
    await user.save();
    return res.status(201).json({
      data: {
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  return res.status(200).json(token);
};

const logout = async (req, res, next) => {
  const { user } = req;
  user.token = null;
  await User.findByIdAndUpdate(user._id, user);

  return res.status(204).json({});
};

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const updateUserSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );

  return res.status(200).json(updatedUser);
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
};

const b = 1;
