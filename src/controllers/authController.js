const { createUser, loginUser, findUser } = require('../model/authService');

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await createUser(email, password);
  const { subscription } = user;
  res.status(201).json({ user: { email, subscription } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await loginUser(email, password);
  const { token, user } = userData;
  const { subscription, avatarUrl } = user;
  res.status(200).json({ token, user: { email, subscription, avatarUrl } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await findUser(_id);
  currentUser.token = null;
  await currentUser.save();
  res.status(204).json({});
};

const receiveCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await findUser(_id);
  const { email, subscription } = currentUser;
  res.status(200).json({ user: { email, subscription } });
};
module.exports = {
  registration,
  login,
  logout,
  receiveCurrentUser,
};
