const messages = {
  200: "contact deleted",
  201: "contact created",
  400: "missing fields",
  401: "Unathorized",
  404: "Not found",
};

const ErrorHandling = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = { ErrorHandling };
