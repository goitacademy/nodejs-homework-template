interface CustomError extends Error {
  status?: number;
}

const errorMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const HttpError = (status: number, message = errorMessageList[status]) => {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
