const handleMongooseError = (error, data, next) => {
  error.sattus = 400;
  next();
};

module.exports = handleMongooseError;
