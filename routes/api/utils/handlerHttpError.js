const massage = {
  400: "missing required name field",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  405: "Method not allowed",
  406: "Not acceptable",
  407: "Proxy authentication required",
  408: "Request timeout",
  409: "Conflict",
};

const handlerHttpError = (status, message = massage[status]) => {
  const error = new Error(massage);
  error.status = status;

  return error;
};

module.exports = handlerHttpError;
