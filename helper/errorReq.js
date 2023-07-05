const messages = {
  400: "missing fields",
  404: "Not found",
  200: "contact deleted",
  201: "contact created",
};

const ErrorHandling = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = { ErrorHandling };
