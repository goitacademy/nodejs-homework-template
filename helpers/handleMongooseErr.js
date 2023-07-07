const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  error.status = status;
  error.message = errMessage;
  next();
};

module.exports = handleMongooseError;
