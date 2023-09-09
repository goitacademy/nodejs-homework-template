const { conrollerWraper } = require("../helpers/controllerWraper");
const {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
} = require("../secrive/usersServices");

const registrationUser = async (req, res) => {
  const subscription = await registerUserService(req.body);

  res.status(201).json({ user: { email: req.body.email, subscription } });
};

const loginUser = async (req, res) => {
  const { token, subscription } = await loginUserService(req.body);

  res
    .status(200)
    .json({ user: { token, email: req.body.email, subscription } });
};

const logoutUser = async (req, res) => {
  await logoutUserService(req.user.id);

  res.status(204).end();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const subscriptionUser = async (req, res) => {
  const updateUser = await subscriptionUserService(
    req.user._id,
    req.body.subscription
  );

  res.status(200).json({ status: "success", code: 200, data: updateUser });
};

module.exports = {
  registrationUser: conrollerWraper(registrationUser),
  loginUser: conrollerWraper(loginUser),
  logoutUser: conrollerWraper(logoutUser),
  currentUser: conrollerWraper(currentUser),
  subscriptionUser: conrollerWraper(subscriptionUser),
};
