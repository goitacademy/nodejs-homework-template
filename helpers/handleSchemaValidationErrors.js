const handleSchemaValidationErrors = (error, data, next) => {
  error.status = 400;
  next();
};

module.exports = handleSchemaValidationErrors;
