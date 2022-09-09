const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { registration, login } = require("../services/authService");

const registrationController = async (req, res) => {
  try {
    const { email, password } = req.body;

    await registration(email, password);
    return res.status(201).json({
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (error) {
    return res.status(409).json({ message: "Email in use" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await login(email, password);
  await User.findByIdAndUpdate({ _id: user._id }, { token: token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutController = async (req, res) => {
  const token = await req.token;
  const user = jwt.decode(token, process.env.JWT_SECRET);

  if (token) {
    await User.findByIdAndUpdate({ _id: user._id }, { token: null });
    res.status(204).json({ message: "No Content" });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

const currentUserController = async (req, res) => {
  const token = await req.token;
  const user = jwt.decode(token, process.env.JWT_SECRET);
  const isUser = await User.find({ _id: user._id, token: token });

  if (isUser.length > 0) {
    return res.status(200).json({
      email: req.user.email,
      subscription: req.user.subscription,
    });
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
};
