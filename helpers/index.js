function tryCatchWrapper(endpointFunction) {
  return async (req, res, next) => {
    try {
      await endpointFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

function HttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = {
  tryCatchWrapper,
  HttpError,
};
