const {
  registrationUser,
  loginUser,
  logoutUser,
  patchUser,
} = require("../services/usersService");

const singupController = async (req, res, next) => {
  const user = await registrationUser(req.body);

  const { email, subscription } = user;

  res.status(201).json({ user: { email, subscription } });
};

const loginController = async (req, res, next) => {
  const { token, user } = await loginUser(req.body);
  const { email, subscription } = user;

  res.status(200).json({ token, user: { email, subscription } });
};

const logoutController = async (req, res, next) => {
  const user = req.user;

  await logoutUser(user);

  res.status(204).send("No Content");
};

const currentUserController = (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const patchUserController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const updatedUser = await patchUser(userId, req.body);

  res.status(200).json({ user: updatedUser });
};

module.exports = {
  singupController,
  loginController,
  logoutController,
  currentUserController,
  patchUserController,
};
