const { User } = require("../models/user");
const RequestError = require("../helpers/RequestError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const registration = async (req, res, _) => {
  const { email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) throw RequestError(409, "Email in use");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ email: email, password: hashPassword });
  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const login = async (req, res, _) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw RequestError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw RequestError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
    usermail: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res, _) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json("No Content");
};

const current = async (req, res, _) => {
  const { id } = req.user;
  const { email, subscription } = await User.findById(id);
  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res, _) => {
  const { id } = req.user;
  const subscription = req.body;
  const user = await User.findByIdAndUpdate(id, subscription, { new: true });

  res.status(200).json({ subscription: user.subscription });
};

module.exports = { registration, login, logout, current, updateSubscription };
