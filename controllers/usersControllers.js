const {
  createUserService,
  loginService,
  logoutService,
  getCurrentUserService,
  changeTypeSubscriptionService,
} = require("../services/usersServices");
const { ctrlWrapper } = require("../utils/decorators");
const bcrypt = require("bcrypt");
const { HttpError } = require("../utils/errors");

const createUser = ctrlWrapper(async (req, res) => {
  const { password, email } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await createUserService({ password: hash, email });

  res.status(201).json({
    user: {
      email,
      subscription: user.subscription,
    },
  });
});

const login = ctrlWrapper(async (req, res) => {
  const { token, email, subscription } = await loginService(req.body);

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
});

const logout = ctrlWrapper(async (req, res) => {
  const user = await logoutService(req.user);

  if (!user) {
    throw new HttpError(401);
  }

  res.status(204).send();
});

const getCurrentUser = ctrlWrapper(async (req, res) => {
  const { email, subscription } = await getCurrentUserService(req.user);

  res.json({ email, subscription });
});

const changeTypeSubscription = ctrlWrapper(async (req, res) => {
  const { email, subscription } = await changeTypeSubscriptionService(req);

  res.json({ email, subscription });
});

module.exports = {
  createUser,
  login,
  logout,
  getCurrentUser,
  changeTypeSubscription,
};
