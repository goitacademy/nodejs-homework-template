const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config(); // Імпортуйте dotenv для зчитування JWT_SECRET з .env файлу

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Використовуйте JWT_SECRET з .env
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;
