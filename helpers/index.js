function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

module.exports = { tryCatchWrapper, HttpError };
