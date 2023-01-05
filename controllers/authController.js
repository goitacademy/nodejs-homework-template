const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../db/UserModel");

const { HttpError, ctrlWrapper } = require("../helpers");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid"); // "Email invalid"
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid"); // "Password invalid"
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  //   const decodeToken = jwt.decode(token);
  //   console.log("decodeToken", decodeToken);
  //   try {
  //     const result = jwt.verify(token, SECRET_KEY);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  res.json({
    token,
    name: user.name,
    email: user.email,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const subscriptionUpdate = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log("subscription", subscription);
  await User.findByIdAndUpdate(_id, { subscription: subscription });

  res.json({
    message: ` Subscription successfuly changed to ${subscription}`,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
};
