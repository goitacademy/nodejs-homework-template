const { createUser } = require('../model/authService');

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await createUser(email, password);
  const { subscription } = user;
  res.status(201).json({ user: { email, subscription } });
};

module.exports = {
  registration,
};
