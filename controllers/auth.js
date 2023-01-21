const { User } = require('../models/user');

async function registration(req, res, next) {
  try {
    const { email, password } = req.body;
    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'user created', user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email in use' });
    }
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  registration,
};
