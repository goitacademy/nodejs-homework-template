const messages = {
  400: "Bad request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  405: "Method not allowed",
  406: "Not acceptable",
  407: "Proxy authentication required",
  408: "Request timeout",
  409: "Conflict",
};

const HttpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
