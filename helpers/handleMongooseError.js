const handleMongooseError = (error, _, next) => {
  error.status = 404;
  next();
};

module.exports = handleMongooseError;
