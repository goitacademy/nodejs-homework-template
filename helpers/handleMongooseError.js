const handleMongooseError = (error, date, next) => {
  error.status = 400;
  next();
};
module.exports = handleMongooseError;
