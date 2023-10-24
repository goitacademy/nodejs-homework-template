const messageList = {
  400: "missing fields",
  401: "Not authorized",
  404: "Not found",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
