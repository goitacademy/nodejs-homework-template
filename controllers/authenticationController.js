const { registration, login } = require('../services/authenticationServices');

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

module.exports = {
  registrationController,
  loginController,
};
