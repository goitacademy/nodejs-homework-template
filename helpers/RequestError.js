const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbbiden",
  404: "Not found",
  409: "Conflict",
};

const RequestError = (status, messege = messages[status]) => {
  const error = new Error(messege);
  error.status = status;
  return error;
};

module.exports = RequestError;
