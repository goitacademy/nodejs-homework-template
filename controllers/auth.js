const bcrypt = require("bcrypt");

const { User } = require("../models/user");

const {
  HttpError,
  controllerWrapper,
  createAndAddToken,
} = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const token = await createAndAddToken(newUser);

  res.status(201).json({
    token,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = await createAndAddToken(user);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
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

const logOut = async (req, res) => {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
};

const subscriptionUpdate = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription: subscription },
    { new: true }
  );

  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }

  res.json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = {
  register: controllerWrapper(register),
  logIn: controllerWrapper(logIn),
  getCurrent: controllerWrapper(getCurrent),
  logOut: controllerWrapper(logOut),
  subscriptionUpdate: controllerWrapper(subscriptionUpdate),
};
