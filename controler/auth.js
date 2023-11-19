const { HttpError, cntrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const regiser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hachPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hachPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: email,
      subscription: subscription,
    },
  });
};
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Not authorized" });
};
module.exports = {
  regiser: cntrlWrapper(regiser),
  login: cntrlWrapper(login),
  getCurrent: cntrlWrapper(getCurrent),
  logout: cntrlWrapper(logout),
};
