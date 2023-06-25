const messages = {
  400: "Bad Request",
  401: "Unathorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const errorHandling = (status, message = messages[status]) => {
  const error = new Error();
  error.status = status;
  return error;
};

module.exports = { errorHandling };
