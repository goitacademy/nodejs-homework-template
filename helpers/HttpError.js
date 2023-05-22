const HttpError = (status, message) => {
  const error = new Error(message);
  status.error = status;
  return error;
};

module.exports = HttpError;
