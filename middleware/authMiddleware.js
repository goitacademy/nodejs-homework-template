const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret); 
    const user = await User.findById(decoded.userId); 

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
