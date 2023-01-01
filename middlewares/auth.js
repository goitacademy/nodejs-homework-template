const jwt = require('jsonwebtoken');
const { findByIdUser } = require('../services/');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || token === '') {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await findByIdUser({ id });

    if (!user || !user.token) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    req.user = {
      id: user._id,
      subscription: user.subscription,
      email: user.email,
    };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = auth;
