const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

const tryCatchWrapper = (endpointFn) => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = { createError, tryCatchWrapper };
