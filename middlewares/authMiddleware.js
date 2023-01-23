const jwt = require('jsonwebtoken');

const { LoginAuthError } = require('../helpers/errors');
const { User } = require('../db/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers['authorization'].split(' ');

    if (!token) {
      next(new LoginAuthError('Not authorized'));
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    const auditUser = await User.find({ _id: user._id, varify: true });

    if (!auditUser || token !== auditUser.token) {
      throw new LoginAuthError('Not authorized');
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(new LoginAuthError('Not authorized'));
  }
};

module.exports = {
  authMiddleware,
};
