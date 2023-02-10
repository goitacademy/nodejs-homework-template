function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

const message = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const ValidationError = (status, message = message[status]) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = {
  tryCatchWrapper,
  ValidationError,
};
