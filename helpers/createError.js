const errorMessages = {
  401: "Bad request",
  402: "Unauthorized",
  403: "Forbiden",
  404: "Not found",
  409: "conflict",
};

function createError({ status, message = errorMessages[status] }) {
  const error = new Error(message);

  error.status = status;

  return error;
}

module.exports = {
  createError,
};
