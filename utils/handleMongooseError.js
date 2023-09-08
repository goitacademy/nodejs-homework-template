const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const isDuplicateEmail = name === 'MongoServerError' && code === 11000;
  error.status = isDuplicateEmail ? 409 : 400;
  next();
};

module.exports = handleMongooseError;
