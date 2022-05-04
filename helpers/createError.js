const statusMessages = {
  400: "Bad request",
  401: "Unauthorized",
  404: "Not found",
  409: "Conflict",
};

const createError = (status, message = statusMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createError;
