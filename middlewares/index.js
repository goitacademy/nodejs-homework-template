const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const authenticate = require('./authentication');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
};
