const messages = {
  400: "missing fields",
  404: "Not found",
};

const HttpError = (status, message = [status]) => {
  const error = new Error(messages);
  error.status = status;
  return error;
};

module.exports = HttpError;