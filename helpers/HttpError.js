const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  error.message = message;
  return error;
};

module.exports = HttpError;
