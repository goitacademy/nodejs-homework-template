const jwt = require('jsonwebtoken');
const User = require('./routes/api/contacts'); 

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, 'qWesz0874531764X');
    const user = await User.findById(decoded.userId);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = {
      userId: user._id,
      email: user.email,
      subscription: user.subscription,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = checkTokenMiddleware;
