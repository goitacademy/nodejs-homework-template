function tryCatchWrapper(endpointFn) {
    return async (req, res, next) => {
        try {
            await endpointFn(req, res, next);
        } catch (error) {
            return next(error);
        }
    }
}

// function HttpError(status, message) {
//     const err = new Error(message);
//     err.status = status;
//     return err;
// }

class HttpError extends Error {
  constructor(message) {
      super(message);
      this.name = "HttpError";
  }
}



module.exports = {
    tryCatchWrapper,
    HttpError,
};
