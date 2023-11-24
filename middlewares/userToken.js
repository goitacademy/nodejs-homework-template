// middlewares\userToken.js
const jwt = require('jsonwebtoken');
const { User } = require('../service/schemas/userSchema');

const userToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized. Missing Bearer token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    console.log('Decoded:', decoded);
    console.log('User:', user);

    if (!user || token !== user.token.toString()) {
      return res.status(401).json({ message: 'Not authorized: User or token mismatch' }); // саме тут виникає помилка!!!!
    }

    req.user = {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    };

    next();
  } catch (error) {
    return res.status(401).json({message: 'Not authorized: Token verification failed' });
  }
};

module.exports = userToken;
