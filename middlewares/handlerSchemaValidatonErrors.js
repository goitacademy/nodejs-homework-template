const handlerSchemaValidatonErrors = (error, data, next) => {
  const { name, code } = error;

  if (name === "ValidationError" && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};

module.exports = handlerSchemaValidatonErrors;
