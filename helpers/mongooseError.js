const mongooseError = (error, data, next) => {
  // const { name, code } = error;
  // error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  error.status = 400;
  next();
};

module.exports = mongooseError;
