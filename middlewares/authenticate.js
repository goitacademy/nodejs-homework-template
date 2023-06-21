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
      console.log('========> ERROR: bearer !== Bearer');
      throw res.status(401).json({ message: 'Not authorized' });
    }
    if (!user || !user.token || user.token !== token) {
      console.log('========> ERROR: !user');
      throw res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    console.log(`user : `, user);
    next();
  } catch (error) {
    console.log(`auth catch`);
    if (error.message === 'jwt must be provided') {
      console.log(`jwt must be provided`);
      error.status = 401;
      error.message = 'Not authorized';
    }
    if (error.message === 'invalid signature') {
      console.log(`invalid signature`);
      error.status = 401;
      error.message = 'Not authorized';
    }
    next(error);
  }
};
module.exports = authenticate;
