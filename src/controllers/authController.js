const jwt = require("jsonwebtoken");
const {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../models/userModel");
const { createError } = require("../helpers/createError");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const newUser = new User({ name, email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { error } = joiLoginSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token: token,
    user: {
      email,
      password,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const { error } = joiSubscriptionSchema.validate({ subscription });
  if (error) {
    throw createError(400);
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = { signup, login, logout, getCurrent, updateSubscription };
