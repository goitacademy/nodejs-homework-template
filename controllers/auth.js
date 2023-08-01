const { ctrlWrapper, HttpError } = require('../helpers');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const registerCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is not valid');
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, 'Email or password is not valid');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
const logoutCtrl = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({
    message: 'Logout success',
  });
};
const getCurrentCtrl = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};
const updateSubscription = async (req, res) => {
  const { _id, subscription } = req.user;
  const newSubscription = req.body.subscription;
  if (newSubscription === subscription) {
    throw HttpError(409, 'Invalid subscription');
  }
  const updatedSubscription = await User.findByIdAndUpdate(
    _id,
    { $set: { subscription: newSubscription } },
    {
      new: true,
    },
  );
  if (!updateSubscription) {
    throw HttpError(409, 'Not Found');
  }
  res.status(200).json({ message: `new subscription is ${updatedSubscription.subscription}` });
};
module.exports = {
  registerCtrl: ctrlWrapper(registerCtrl),
  loginCtrl: ctrlWrapper(loginCtrl),
  logoutCtrl: ctrlWrapper(logoutCtrl),
  getCurrentCtrl: ctrlWrapper(getCurrentCtrl),
  updateSubscription: ctrlWrapper(updateSubscription),
};
