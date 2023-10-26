const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const checkToken = async (req, res, next) => {
  const {authorization} = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Помилка верифікації токена' });
  }
};

module.exports = checkToken;
