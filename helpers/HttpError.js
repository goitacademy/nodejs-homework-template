const errorMessageList = {
  400: "Bad request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const HttpError = (status, obj = { message: errorMessageList[status] }) => {
  const error = new Error();
  error.status = status;
  error.error = { ...obj };
  return error;
};

module.exports = { HttpError };
