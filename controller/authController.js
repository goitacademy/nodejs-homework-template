const {
  signup,
  signin,
  logout,
  currentUser,
} = require("../service/authService");

const signupController = async (req, res) => {
  const { email, password } = req.body;
  await signup(email, password);
  res.status(201).json({ message: "success", email, subscription: "starter" });
};

const singinController = async (req, res) => {
  const { email, password } = req.body;
  const token = await signin(email, password);
  res.json({ message: "success", token, email, subscription: "starter" });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json({ Status: "No content" });
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await currentUser(_id);
  res.status(200).json({ email: user.email, subscription: user.subscription });
};

module.exports = {
  signupController,
  singinController,
  logoutController,
  currentUserController,
};
