const handleMongooseError = (error, data, next) => {
  console.log(error);
  const { name, code } = error;
  const status = (name === 'MongoServerError' && code === 11000) ? 400 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;
