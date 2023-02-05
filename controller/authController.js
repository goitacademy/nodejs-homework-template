const { register, login, logout } = require("../services/authService");

const registerController = async (req, res, next) => {
  try {
    const user = await register(req.body);
    const { email, subscription } = user.toObject();
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const user = await login(req.body);
    const { email, token, subscription } = user.toObject();
    res.status(200).json({ token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
