const errorsList = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  409: "Conflict",
};

const HttpErrors = (status, message = errorsList[status]) => {
  const error = new Error(message);

  error.status = status;
  return error;
};

module.exports = HttpErrors;
