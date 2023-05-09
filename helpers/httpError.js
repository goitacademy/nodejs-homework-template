const errorMessages = {
  400: "Bad request",
  404: "Not found",
  500: "Server error",
};

const httpError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = httpError;
