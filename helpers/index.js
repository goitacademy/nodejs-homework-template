const tryCatchWrapper = (endpointFn) => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}

module.exports = {
  tryCatchWrapper,
  createError,
};