const { createUser, loginUser, findUser } = require('../model/authService');
const { LogoutUnauthorizeError } = require('../helpers/errors');

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
  const { subscription } = user;

  res.status(200).json({ token, user: { email, subscription } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const currentUser = await findUser(_id);
  if (!currentUser) {
    throw new LogoutUnauthorizeError('User doesnt exist');
  }
  console.log('before', currentUser);
  currentUser.token = null;
  await currentUser.save();
  console.log('after', currentUser);
  res.status(204);
};
module.exports = {
  registration,
  login,
  logout,
};
