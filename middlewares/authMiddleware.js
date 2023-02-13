const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../schemas/modelUser');

const authMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers['autorization'];
  if (tokenType !== 'Bearer' || !token) {
    res.status(401).json({
      message: 'Not authorized',
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(id);
    if (!user || token !== user.token) {
      res.status(401).json({
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Not authorized',
    });
  }
};

module.exports = { authMiddleware };
