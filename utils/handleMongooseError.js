const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  error.status = 400;
  next();
};

module.exports = handleMongooseError;