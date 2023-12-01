const errorMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
};

export const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

export default HttpError;
