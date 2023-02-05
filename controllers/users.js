const { Users } = require("../models/user");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
} = require("../services/usersService");

const registerUserController = async (req, res) => {
  const newUser = await registerUser(req.body);
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);
  res.status(201).json(user);
};

const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);
  res.status(204).json();
};

const refreshUserController = async (req, res) => {
  const user = await refreshUser(req.user.token);
  res.json(user);
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
};
