const { json } = require("express/lib/response");
const { User } = require("../models/User");
const {
  signupService,
  loginService,
  logoutService,
  updateAvatarService,
} = require("../models/services/auth");
const { catchAsync } = require("../utils/catchAsync");

let signup = async (req, res) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
};
signup = catchAsync(signup);

let login = async (req, res) => {
  const { user, token } = await loginService(req.body);
  res.json({
    user,
    token,
  });
};
login = catchAsync(login);

let logout = async (req, res) => {
  await logoutService(req.user);
  res.json({
    message: "Logout successful",
  });
};
logout = catchAsync(logout);

let getCurrentUser = async (req, res) => {
  const { name, email, subscription } = req.user;

  res.json({
    name,
    email,
    subscription,
  });
};

getCurrentUser = catchAsync(getCurrentUser);

let updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const fetchedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.status(200).json(fetchedUser);
};

updateSubscription = catchAsync(updateSubscription);

let updateAvatar = async (req, res) => {
  await updateAvatarService(req.user, req.file);
  const { avatarUrl } = req.user;
  res.status(200).json(avatarUrl);
};

updateAvatar = catchAsync(updateAvatar);

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
