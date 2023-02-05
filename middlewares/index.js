const { validateBody, validateQueryParams } = require('./joiValidation');
const validateJwtToken = require('./authValidation');

module.exports = { validateBody, validateQueryParams, validateJwtToken };
