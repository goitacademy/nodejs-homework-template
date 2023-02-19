const HttpError = ({ status, message = '', details = {} }) => {
  const error = new Error(message);
  error.status = status;
  if (details) {
    error.details = details;
  }
  return error;
};

module.exports = HttpError;
