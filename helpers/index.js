function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpErrors(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = {
  tryCatchWrapper,
  HttpErrors,
};
