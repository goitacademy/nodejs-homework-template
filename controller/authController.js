const {
  signup,
  signin,
  logout,
  currentUser,
  updateUserAvatar,
} = require("../service/authService");

const signupController = async (req, res) => {
  const { email, password } = req.body;
  await signup(email, password);
  res.status(201).json({ message: "success", email, subscription: "starter" });
};

const singinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await signin(email, password);
  res.json({
    message: "success",
    token: user.token,
    email: user.email,
    subscription: user.subscription,
    avatar: user.avatar,
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  const token = req.token;
  await logout(id, token);
  res.status(204).json({ Status: "No content" });
};

const currentUserController = async (req, res) => {
  const { id } = req.user;
  const token = req.token;
  const user = await currentUser(id, token);
  res
    .status(200)
    .json({ email: user.email, subscription: user.subscription, token });
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const token = req.token;
  const avatarPath = req.file.path;
  const { avatar } = await updateUserAvatar({ id, token, avatarPath });
  res.status(200).json({
    avatar,
  });
};
module.exports = {
  signupController,
  singinController,
  logoutController,
  currentUserController,
  updateAvatar,
};
