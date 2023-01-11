function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function tryCatcher(endpointFunction) {
  return async (req, res, next) => {
    try {
      await endpointFunction(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}
module.exports = { httpError, tryCatcher };
