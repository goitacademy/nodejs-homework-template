const statusCode = require("./statusCode");

const createError = (status, message = statusCode[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = { createError };
