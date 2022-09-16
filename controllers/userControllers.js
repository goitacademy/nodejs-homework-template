const { register, login, logout, updateSubscription } = require("../services");

const registerController = async (req, res) => {
  const user = await register(req.body);

  res.status(201).json({ status: "Created", user });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await login(password, email);

  res.status(200).json({ user, token });
};

const logoutController = async (req, res) => {
  const user = req.user;
  await logout(user._id);

  res.status(204).json({});
};

const getCurrentUserController = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const updateSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await updateSubscription(_id, subscription);

  res.status(200).json({ status: "success" });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
};
