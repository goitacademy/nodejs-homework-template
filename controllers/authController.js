const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { RequestError } = require("../helpers");
const User = require("../models/user");

const { TOKEN_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw RequestError(409`Email: ${email} already in use`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid || !existingUser) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: existingUser._id,
  };
  const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(existingUser._id, { token });
  res.json({ token });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "No Content",
  });
};

const current = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = { register, login, logout, current };
