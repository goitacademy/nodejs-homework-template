const HttpError = require('./HttpError');

const handleMongooseError = (error, data, next) => {
  const errorMessage = error.errors.name.properties.message;
  next(HttpError({ status: 400, message: errorMessage }));
};

module.exports = handleMongooseError;
