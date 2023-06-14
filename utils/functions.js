const ApiError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const contactSchemaError = (error, doc, next) => {
  error.status = 400;
  next();
};

module.exports = { ApiError, contactSchemaError };
