const messageList = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  405: "Conflict",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status= status;
  return error;
};

export default HttpError;
