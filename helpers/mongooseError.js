const mongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  const message =
    name === "MongoServerError" && code === 11000
      ? `Email "${data.email}" in use`
      : error.message;
  error.status = status;
  error.message = message;
  next();
};

module.exports = mongooseError;
