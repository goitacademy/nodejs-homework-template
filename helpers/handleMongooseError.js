const handleMongooseError = (err, _, next) => {
  err.status = 400;
  next();
};

module.exports = handleMongooseError;
