const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  // console.log("NEW REQUEST RECEIVED");
  // console.log("Request Headers:", req.headers);

  const authHeader = req.header('Authorization');
  if (!authHeader) {
    // console.log("No Authorization header found");
    return res.status(401).json({ message: 'Not authorized - No Authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  // console.log("Extracted Token:", token);

  if (!token) {
    // console.log("No token provided");
    return res.status(401).json({ message: 'Not authorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id);
    // console.log("👤 User Found in DB:", user);

    if (!user) {
      // console.log("User not found in DB");
      return res.status(401).json({ message: 'Not authorized - User not found' });
    }

    // console.log(`Token in DB: ${user.token}`);
    // console.log(`Token received: ${token}`);

    if (user.token !== token) {
      // console.log(`Token mismatch! Expected ${user.token}, got ${token}`);
      return res.status(401).json({ message: 'Not authorized - Token mismatch' });
    }

    req.user = user;
    // console.log("Authorization successful");
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(401).json({ message: `Not authorized - ${error.message}` });
  }
};

module.exports = authMiddleware;
