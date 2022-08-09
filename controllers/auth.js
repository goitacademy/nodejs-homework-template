const { signup, login, logout } = require("../services/authService");

const signupController = async (req, res) => {
  const { email, password } = req.body;
  const user = await signup(email, password);

  res.json({ user, status: "success" });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  res.json({ status: "success", user });
};

const logoutController = async (req, res) => {
  const { _id: userId } = req.user;
  await logout(userId);

  res.status(200).json({ status: "no content" });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
};
