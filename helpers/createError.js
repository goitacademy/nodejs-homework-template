const messages = {
  400: "Bad request",
  401: "Not authorize",
  403: "Forbidden ",
  404: "Not found",
  409: "Conflict",
};

// const createError = (status, message)
const createError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  console.log("status:", status);
  console.log("message:", message);
  return error;
};

module.exports = createError;
