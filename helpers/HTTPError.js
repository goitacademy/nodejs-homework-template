const errorCodes = require("../responses");

module.exports = (code, message = null) => {
  const error = new Error(message ?? errorCodes[code]);
  error.code = code
  return error;
};
