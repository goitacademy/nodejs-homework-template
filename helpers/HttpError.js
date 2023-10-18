const HttpError = (status, message) => {
  const error = new global.Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
