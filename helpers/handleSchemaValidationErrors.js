const handleSchemaValidationErrors = (error, data, next) => {
  console.log(error.name);
  if (error.name === "MongoServerError" && error.code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }

  next();
};

module.exports = handleSchemaValidationErrors;
