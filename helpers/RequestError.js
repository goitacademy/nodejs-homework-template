const message = {
  400: "Bad request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not found",
};

const RequestError = (status, message = message[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = RequestError;
