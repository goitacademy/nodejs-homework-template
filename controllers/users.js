const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { body } = req;

  if (await User.findOne({ email: body.email }))
    throw HttpError({ status: 409, message: "This email is already in use" });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const { email, subscription } = await User.create({
    ...body,
    password: hashedPassword,
  });

  res.status(201).json({ user: { email, subscription } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    throw HttpError({ status: 401, message: "Email or password is wrong" });

  if (!bcrypt.compare(password, user.password)) {
    throw HttpError({ status: 401, message: "Email or password is wrong" });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    { token },
    { new: true }
  );

  res.json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const updateSubscriptionType = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json(user);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscriptionType: ctrlWrapper(updateSubscriptionType),
};
