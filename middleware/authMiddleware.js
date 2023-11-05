const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;
