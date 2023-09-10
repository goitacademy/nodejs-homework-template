const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const handleErrors = require('./validationErrors');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validation,
  ctrlWrapper,
  handleErrors,
  isValidId,
  authenticate,
  upload,
};