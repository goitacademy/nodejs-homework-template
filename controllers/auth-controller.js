const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../helpers/httpError");
const ctrlWrapper = require("../decorators/ctrlWrapper");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const { _id: id } = user;
  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  await User.findByIdAndUpdate(id, { accessToken });
  res.json({
    accessToken,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
};

const getCurrent = (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    subscription,
    email,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "" });

  res.json({
    message: "Signout success",
  });
};

const refresh = async (req, res) => {
  const { subscription } = req.body;
  const { _id: userId } = req.user;
  const validSubscriptions = ["starter", "pro", "business"];
  if (!validSubscriptions.includes(subscription)) {
    throw HttpError(400, "Invalid subscription value.");
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );

  if (!updatedUser) {
    throw HttpError(404, "User not found.");
  }
  res.json({
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  refresh: ctrlWrapper(refresh),
};
