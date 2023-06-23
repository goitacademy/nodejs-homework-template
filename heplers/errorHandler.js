const messages = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const errorHandler = (status) => {
  const error = new Error(messages[status]);
  error.status = status;
  return error;
};

module.exports = errorHandler;
