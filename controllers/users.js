const { conrollerWraper } = require("../helpers/controllerWraper");
const {
  registerUserService,
  loginUserService,
  logoutUserService,
} = require("../secrive/usersServices");

const registrationUser = async (req, res) => {
  const subscription = await registerUserService(req.body);

  res.status(201).send({ user: { email: req.body.email, subscription } });
};

const loginUser = async (req, res) => {
  const { token, subscription } = await loginUserService(req.body);

  res
    .status(200)
    .send({ user: { token, email: req.body.email, subscription } });
};

const logoutUser = async (req, res) => {
  await logoutUserService(req.user.id);

  res.status(204).end();
};

const currentUser = async (req, res) => {
  //   await logoutUserService(req.user._id);
  const { email, subscription } = req.user;

  res.status(200).send({ email, subscription });
};

module.exports = {
  registrationUser: conrollerWraper(registrationUser),
  loginUser: conrollerWraper(loginUser),
  logoutUser: conrollerWraper(logoutUser),
  currentUser: conrollerWraper(currentUser),
};
