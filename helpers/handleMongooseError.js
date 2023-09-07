const handleMongooseError = (error, data, next) => {
    error.status = 404;
    next();
  };

  module.exports = handleMongooseError;