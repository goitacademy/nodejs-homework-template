function ErrorHttp(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = {
  ErrorHttp,
};

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}
