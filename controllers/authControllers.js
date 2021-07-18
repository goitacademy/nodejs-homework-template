const {
  registration,
  login,
  logout,
  currentUser,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);
  res.status(201).json({ email, password, status: "success" });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.json({ status: "success", token });
};

const currenUserController = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await currentUser(userId);
  res.json({
    email: user.email,
    subscription: user.subscription,
    status: "success",
  });
};

const logoutController = async (req, res) => {
  const { _id: userId } = req.user;
  await logout(userId);
  res.status(204).json({ status: "204 No Content" });
};

module.exports = {
  registrationController,
  loginController,
  currenUserController,
  logoutController,
};
