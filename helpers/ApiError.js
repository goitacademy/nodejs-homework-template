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
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

module.exports = { ApiError, FindByIdError, handleMongooseError };
