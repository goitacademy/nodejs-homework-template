const HandleMongooseError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 409 ? 409 : 400;
  next();
};

module.exports = HandleMongooseError;
