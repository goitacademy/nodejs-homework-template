const messages = {
  400: "Bad Request",
  401: "Unathorized",
  403: "Forbbiden",
  404: "Not Found",
  409: "Conflict",
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = RequestError;
