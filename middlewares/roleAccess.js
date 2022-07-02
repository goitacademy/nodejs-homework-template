const { Forbidden } = require('http-errors');
const { messages } = require('../libs');

const roleAccess = role => async (req, res, next) => {
  try {
    const roleCurrentUser = req.user.role;
    if (roleCurrentUser !== role) {
      throw new Forbidden(`${messages.FORBIDDEN[req.app.get('lang')]}`);
    }

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = roleAccess;
