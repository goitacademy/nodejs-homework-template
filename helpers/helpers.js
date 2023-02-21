function ctrlhWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    }
    catch (error) {
      return next(error);
    }
  };
}

const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
};

function HttpError(status, message = messages[status]) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = {
  ctrlhWrapper,
  HttpError,
};