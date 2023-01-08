function tryCatchWrapper(enpointFn) {
  return async (res, req, next) => {
    try {
      await enpointFn(res, req, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = {
  tryCatchWrapper,
  HttpError,
};
