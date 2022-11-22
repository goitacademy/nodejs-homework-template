const handleSchemaValidationErrors = (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    // если не уникальное значение то будет 409
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};

module.exports = handleSchemaValidationErrors;
