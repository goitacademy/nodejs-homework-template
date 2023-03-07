const HttpError = ({ status = 404, message = '', details = null }) => {
  // const error = new Error(message);
  // error.status = status;

  // error.details = details;

  return { status, message, details };
};

module.exports = HttpError;
