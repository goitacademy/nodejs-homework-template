const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decodedToken = jwt.verify(token, 'secret_key');

    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findById(decodedToken.userId);

    if (!user || token !== user.token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = {
      userId: user._id,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authenticateToken;