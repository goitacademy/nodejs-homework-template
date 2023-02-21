const HttpError = ({ status = 404, message = '', details = null }) => {
  const error = new Error(message);
  error.status = status;

  error.details = details;

  return error;
};

module.exports = HttpError;
