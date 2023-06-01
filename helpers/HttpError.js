const messagesList = {
  400: "Missing required name field",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = messagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  console.log(error);
  return error;
};

module.exports = HttpError;
