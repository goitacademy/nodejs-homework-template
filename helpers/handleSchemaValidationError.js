const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationError = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 404;
  next();
};

module.exports = handleSchemaValidationError;
