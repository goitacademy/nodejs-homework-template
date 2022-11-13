function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

function createNotFoundError() {
  const err = new Error("Not Found");
  err.status = 404;
}

function NotAuthorizedError() {
  const err = new Error("Not Authorized");
  err.status = 401;
}

module.exports = {
  tryCatchWrapper,
  createNotFoundError,
  NotAuthorizedError,
};
