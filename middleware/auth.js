const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authorization.replace('Bearer ', '');
  
  try {

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = auth;
