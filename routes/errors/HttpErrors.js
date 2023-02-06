const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment required",
  403: "Forbidden",
  404: "Not found",
  405: "Method not allowed",
  409: "Conflict",
};

const HttpError = (
  status,
  message = messages[status]
) => {
  const error = new Error(message);
  error.status = status;
  console.log("In error", message);
  return error;
};

module.exports = {
  HttpError,
};
