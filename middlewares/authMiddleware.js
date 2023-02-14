const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../schemas/modelUser');

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [tokenType, token] = authorization.split(' ');

  if (tokenType !== 'Bearer' || !token) {
    console.log('No token');
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(_id);
    if (!user || token !== user.token) {
      console.log('No user');
      return res.status(401).json({
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('Сработал catch authMiddleware');
    res.status(401).json({
      message: 'Not authorized',
    });
  }
};

module.exports = { authMiddleware };
