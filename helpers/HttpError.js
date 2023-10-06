const HttpError = (status, message) => {
  const error = new Error(message);
  error.sttus = status;
  return error;
};

module.exports = HttpError;
