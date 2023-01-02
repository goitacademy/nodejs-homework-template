const tryCatchWrapper = endpointFn => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const HttpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = {
  tryCatchWrapper,
  HttpError,
};
