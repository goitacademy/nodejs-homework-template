const isConflict = ({ name, code }) => name === 'MongoServerError' && code === 11000;

const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

const handleSchemaValidationErrors = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
};

module.exports = { createError, handleSchemaValidationErrors };
