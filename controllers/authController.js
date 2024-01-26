const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { userModel } = require("../models");
const { HttpError, controllerWrapper } = require("../helpers");

const { User } = userModel;
const { SECRET_KEY } = process.env;

const register = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({
    ...request.body,
    password: hashPassword,
  });

  response.json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  const { subscription } = user;
  response.json({ token, user: { email, subscription } });
};

const getCurrent = async (request, response, next) => {
    const { email, subscription } = request.user;
    response.json({ email, subscription });
};

const logout = async (request, response, next) => {
    const { _id } = request.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    response.status(204).end();
};

const updateSubscription = async (request, response, next) => {
    const { _id } = request.user;
    const { subscription } = request.body;
    await User.findByIdAndUpdate(_id, { subscription });

    response.json({ _id, subscription });
};

module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    getCurrent: controllerWrapper(getCurrent),
    logout: controllerWrapper(logout),
    updateSubscription: controllerWrapper(updateSubscription),
};
