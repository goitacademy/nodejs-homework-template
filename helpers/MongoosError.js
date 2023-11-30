const MongooseError = (error, data, next) => {
  if (error.code === 11000) {
    error.status = 409;
    error.message = "Email in use";
  } else {
    error.status = 404;
  }
  next();
};

module.exports = MongooseError;
