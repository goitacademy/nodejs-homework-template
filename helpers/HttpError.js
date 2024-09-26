const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = 404;
  return error;
};

module.exports = HttpError;
