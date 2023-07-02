const validateBody = require('./validatebody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');
const avatarOptimizer = require('./avatarOptimizer');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  avatarOptimizer,
};
