const validateBody = require('./validateBody');
const ctrlWrapper = require('./controllerWrepper');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validateBody,
  ctrlWrapper,
  authenticate,
  upload,
};
