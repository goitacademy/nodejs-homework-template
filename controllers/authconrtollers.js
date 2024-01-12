const { catchAsync } = require("../addoption");
const userServices = require("./../models/userServices");
const { User } = require("../models");

const signup = catchAsync(async (req, res, next) => {
  const { email, password, token } = req.body;

  const user = await userServices.registerUser({ email, password });

  res.status(201).json(user);
});

const login = catchAsync(async (req, res) => {
  const { user, token } = await userServices.login(req.body);

  res.status(200).json({
    user,
    token,
  });
});

const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
});

const getCurrent = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    user: { email, subscription },
  });
});

const avatars = catchAsync(async (req, res) => {
  const { avatarURL } = await userServices.avatars(
    req.body,
    req.user,
    req.file,
    res
  );

  res.status(200).json({
    avatarURL,
  });
});

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  avatars,
};
