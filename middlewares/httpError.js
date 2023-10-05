const listHttpMessage = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  301: "Moved Permanently",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  default: "Something went wrong, please try again later...",
};

const HttpError = (
  status,
  message = listHttpMessage[status] || listHttpMessage.default
) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = { HttpError };
