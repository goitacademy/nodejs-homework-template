const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (bearer !== 'Bearer') {
      console.log('ERROR: bearer !== Bearer');
      throw res.status(401).json({ message: 'Not authorized' });
    }
    if (!user) {
      console.log('ERROR: !user');
      throw res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch {
    console.log(' ERROR: catch ');
    res.status(401).json({ message: 'Not authorized' });
  }
};
module.exports = authenticate;
