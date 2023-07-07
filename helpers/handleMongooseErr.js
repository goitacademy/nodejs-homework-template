const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  const errMessage =
    name === 'MongoServerError' && code === 11000
      ? 'Email in use'
      : error.message;
  error.status = status;
  error.message = errMessage;
  next();
};

module.exports = handleMongooseError;
