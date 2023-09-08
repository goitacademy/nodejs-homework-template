const messages = {
  400: "Bad Request",
  401: "Unauthorizate",
  403: "Forbidden",
  404: "Not Found",
  405: "Conflict",
};
const HttpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
