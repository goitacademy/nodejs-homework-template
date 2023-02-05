const {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
} = require("../services/usersService");

const registerUserController = async (req, res) => {
  const newUser = await registerUser(req.body);
  res.status(201).json({ user: newUser });
};

const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);
  res.status(201).json(user);
};

const logoutUserController = async (req, res) => {};

const refreshUserController = async (req, res) => {};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
};
