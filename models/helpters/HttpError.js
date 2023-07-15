const messageList = {
  404: "Not found",
  400: "missing required name field",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);

  error.status = status;

  return error;
};

export default HttpError;
