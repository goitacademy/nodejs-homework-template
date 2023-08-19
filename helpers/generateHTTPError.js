const STATUS_CODES = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const generateHTTPError = (status, message) => {
  if (!message) message = STATUS_CODES[status];
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = generateHTTPError;
