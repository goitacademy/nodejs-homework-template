const ApiError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const FindByIdError = (result) => {
  if (!result) {
    throw ApiError(404, "Not found");
  }
};

const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next();
};

module.exports = { ApiError, FindByIdError, handleMongooseError };
