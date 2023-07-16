const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next(error);
};

module.exports = handleMongooseError;