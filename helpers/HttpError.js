const messagesList = {
  400: "Bad Request",
  401: "Unauthrized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = messagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
export default HttpError;
