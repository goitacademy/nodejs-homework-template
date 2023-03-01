const isBodyNotEmpty = require('./isBodyNotEmpty');
const isValidId = require('./isValidId');
const schemaValidator = require('./schemaValidator');
const authCheckValid = require('./auth');
const filesHandler = require('./filesHandler');
module.exports = {
  isBodyNotEmpty,
  isValidId,
  schemaValidator,
  authCheckValid,
  filesHandler,
};
