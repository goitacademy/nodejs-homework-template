const { signup, login, logout, updateSubscription } = require("../services");

exports.signup = async (req, res, next) => {
  const { user, token } = await signup(req.body);

  res.status(201).json({ message: "Success", user, token });
};

exports.login = async (req, res) => {
  const { user, token } = await login(req.body);

  res.status(200).json({
    message: "Success",
    user,
    token,
  });
};

exports.logout = async (req, res) => {
  const user = await logout(req.user);

  res.status(204).json({
    message: "Success",
    user,
  });
};

exports.current = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

exports.updateSubscription = async (req, res) => {
  const updatedUser = await updateSubscription(req.body, req.user);
  res.status(201).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};
