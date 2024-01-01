const httpErrorsMessages = {
  400: "Bad request",
  401: "No authorization",
  404: "Page not found",
  500: "Server error",
};
const HttpError = (status, message = httpErrorsMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
