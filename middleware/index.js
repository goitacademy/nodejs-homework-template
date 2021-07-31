const contactValidateMiddleware = require('./contactValidateMiddleware');
const validateMiddleware = require('./validateMiddleware');
const authenticate = require('./authentificate');

module.exports = {
  contactValidateMiddleware,
  validateMiddleware,
  authenticate,
};
