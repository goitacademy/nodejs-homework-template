const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { func } = require("joi");
const { JWT_SECRET } = process.env;

async function signup(req, res, next) {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    password: hashedPassword,
    email,
  });

  res
    .status(201)
    .json({ data: { user: { email, subscription: newUser.subscription } } });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isPassworValid = await bcrypt.compare(password, storedUser.password);
  if (!isPassworValid) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = await jwt.sign({ id: storedUser._id }, JWT_SECRET, {
    expiresIn: "2h",
  });
  const updateUser = await User.findByIdAndUpdate(
    storedUser._id,
    { token: token },
    {
      new: true,
    }
  );
  res.status(200).json({
    data: {
      user: { email, subscription: storedUser.subscription, token: token },
    },
  });
}
async function logout(req, res, next) {
  const { user } = req;
  if (!user) {
    throw HttpError(401, "Not authorized user");
  }
  const updateUser = await User.findByIdAndUpdate(
    user._id,
    { token: null },
    {
      new: true,
    }
  );
  res.status(204).json(updateUser);
}

async function current(req, res, next) {
  const { user } = req;
  if (!user) {
    throw HttpError(401, "Not authorized user");
  }

  const { email, subscription } = user;
  res.status(200).json({
    data: { user: { email: email, subscription: subscription } },
  });
}
async function changeSubscription(req, res, next) {
  const { user } = req;
  if (!user) {
    throw HttpError(401, "Not authorized user");
  }
  const updateUser = await User.findByIdAndUpdate(user._id, req.body);
  res.status(200).json({
    user: {
      email: updateUser.email,
      description: updateUser.subscription,
    },
  });
}

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  changeSubscription: ctrlWrapper(changeSubscription),
};
