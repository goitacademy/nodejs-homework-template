const validateBody = require('./validateBody');
const validateParams = require('./validateParams');
const controlWrapper = require('./controlWrapper');
const validateAuth = require('./validateAuth');
const validateUpload = require('./validateUpload');

module.exports = {
  validateBody,
  validateParams,
  controlWrapper,
  validateAuth,
  validateUpload,
};
