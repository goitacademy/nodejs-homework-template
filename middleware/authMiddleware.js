const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("Received Token:", token);
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    const user = await User.findById(decoded.id);
    console.log("User Found:", user);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;