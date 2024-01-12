const handleMongooseError = (err, data, next) => {
  const { name, code } = err;
  const status = name === "MongoServeError" && code === 11000 ? 409 : 400;
  err.status = status;
  next();
};

module.exports = handleMongooseError;
