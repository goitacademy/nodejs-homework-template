function HttpError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
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
    tryCatchWrapper
};