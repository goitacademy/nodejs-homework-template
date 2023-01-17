const {
  registration,
  login,
  logout,
  current,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registration(email, password);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await login(email, password);
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
const logoutController = async (req, res) => {
  const userId = req.user._id;
  await logout(userId);
  res.sendStatus(204);
};
const currentController = async (req, res) => {
  const userId = req.user._id;
  const user = await current(userId);
  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
};
