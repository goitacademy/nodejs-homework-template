const errorMessages = {
  400: "Bad Request",
  401: "Unauthorzed",
  403: "Forbiden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
