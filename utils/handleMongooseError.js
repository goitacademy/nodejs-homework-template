const handleMongooseError = (error, data, next) => {
  error.status = 400;
};

module.exports = handleMongooseError;
