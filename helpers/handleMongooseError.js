const handleMongooseError = (erorr, data, next) => {
  const { name, code } = erorr;
  const status = (name === "MongoServerError" && code === 11000) ? 409 : 400
    erorr.status = status;
  next();
};

module.exports = handleMongooseError;