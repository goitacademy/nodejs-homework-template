const HttpError = require("./HttpError");

const handleMongooseError = (error, data, next) => {
  if (error) {
    next(HttpError(400, "Bad Request"));
  }
  next();
};

module.exports = handleMongooseError;
