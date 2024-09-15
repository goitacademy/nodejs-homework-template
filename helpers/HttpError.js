const errorMEssageList = {
  400: "Bad Request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

export const HttpError = (status, message = errorMEssageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
