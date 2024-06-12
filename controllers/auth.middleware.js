const jwt = require('jsonwebtoken');
const User = require('../models/users');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.json({
      status: 'failed',
      code: 401,
      message: 'Not authorized',
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = User.findById(decodedToken.userId);
    if (!user || user.token !== token) {
      return res.json({
        status: 'failed',
        code: 401,
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      status: 'failed',
      code: 401,
      message: 'Not authorized',
    });
  }
};

module.exports = verifyToken;
