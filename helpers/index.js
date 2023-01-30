function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function NotFound(req, res) {
  res.status(404).send(`This path ${req.baseUrl} can't found`);
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
  NotFound,
  tryCatchWrapper,
};