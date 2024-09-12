const {
  registration,
  login,
  logout,
  currentUser,
  patchUserSubscription,
} = require("../services/usersService");

const subscriptionController = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const user = await patchUserSubscription(id, subscription);
  res.json({ user });
};

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registration({ email, password });
  res.status(201).json({ user });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { token, userFind: user } = await login({ email, password });
  res.json({ token, user });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await logout(id);
  res.status(204).json({ message: `Logout user: ${id}` });
};

const currentController = async (req, res) => {
  const { id } = req.user;
  const user = await currentUser(id);
  res.json({ user });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  subscriptionController,
};
