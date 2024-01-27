const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const saltRounds = 10;

dotenv.config();

const { userModel } = require("../models");
const { HttpError, controllerWrapper } = require("../helpers");
const { User } = userModel;
const { SECRET_KEY } = process.env;

const signup = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({
    ...request.body,
    password: hashPassword,
  });
  response.status(200).json({
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
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
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
  signup: controllerWrapper(signup),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateSubscription: controllerWrapper(updateSubscription),
};
