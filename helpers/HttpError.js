const HttpError = (status, message) => {
  const error = new Error(message);
  error.statusCode = status;
  return error;
};

module.exports = HttpError;