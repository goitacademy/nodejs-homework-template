const messages = {
  400: "missing required name field",
  401: "Not authorized",
  403: "Forbbiden",
  404: "Not found",
  409: "Conflict",
};
const HttpErrors = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
module.exports = HttpErrors;
