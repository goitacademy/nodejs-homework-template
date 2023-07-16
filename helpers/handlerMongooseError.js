const handlerMongooseError = (error, data, next) => {
  error.status = 400;
  next();
};

module.exports = handlerMongooseError;
