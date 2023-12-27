const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const isBodyEmpty = require('./IsBodyEmpty');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  isBodyEmpty,
  authenticate,
  upload,
};
