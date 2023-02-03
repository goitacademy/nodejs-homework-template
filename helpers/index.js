class HttpError extends Error {
  constructor(message) {
    super(message)
    this.name = "HttpError";
    this.message = message;
  }
}

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}



module.exports = {
  HttpError,
  tryCatchWrapper,
};