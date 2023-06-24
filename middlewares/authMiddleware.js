const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    // Weryfikacja tokenu
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Twój sekretny klucz JWT

    // Sprawdzenie użytkownika i tokenu
    const user = await User.findOne({ _id: decoded._id, token });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;
