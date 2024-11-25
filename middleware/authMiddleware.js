const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/contactModal');

const protectMiddleware = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];
  
  if (!token) {
    
    return;
  }
  const decoded = jsonwebtoken.verify(token, 'iehasdnaskdjhwqkdnadskjd');
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    
    return;
  }

  req.user = currentUser;
  next();
};

const allowFor = (...roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) return next();

  next(new Error());
};

module.exports = { 
    protectMiddleware, 
    allowFor };
