const { validateBody, validateQueryParams } = require('./joiValidation');
const validateJwtToken = require('./authValidation');
const uploadFile = require('./uploadImage');

module.exports = {
  validateBody,
  validateQueryParams,
  validateJwtToken,
  uploadFile,
};
