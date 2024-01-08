const Error = require('./error');
const wrapControler = require('./controleWrapper');
const mongooseErrorHandler = require('./mongooseErrorHandler');
module.exports = {
  Error,
  wrapControler,
  mongooseErrorHandler,
};
