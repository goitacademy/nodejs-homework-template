const {
  registration,
  login,
  logout,
} = require('../services/authenticationServices');

async function registrationController(req, res) {
  const { email, password } = req.body;
  const user = await registration(email, password);
  res.status(200).json({ user, status: 'Registration success' });
}

async function loginController(req, res) {
  const { email, password } = req.body;

  const token = await login(email, password);

  res.status(200).json({ status: 'login success', token });
}

async function logoutController(req, res) {
  const { _id: userId } = req.user;
  await logout(userId);

  res.status(200).json({ status: 'no content' });
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
