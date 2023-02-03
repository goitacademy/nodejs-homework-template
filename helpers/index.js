function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "httpError";
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  CustomError,
  tryCatchWrapper,
};
