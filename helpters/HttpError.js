const messageList = {
  404: "Not found",
  400: "missing required field",
  409: "Email in use"
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);

  error.status = status;

  return error;
};

export default HttpError;
