const errorsMessage = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const handleError = (status, message = errorsMessage[status]) => {
  const newError = new Error(message);
  newError.status = status;

  return newError;
};

module.exports = handleError;
