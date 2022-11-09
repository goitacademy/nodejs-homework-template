const tryCatchWrapper = (endpointFn) => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const createNotFoundHttpError = (id) => {
  const err = new Error(`Contact with id '${id}' not found`);
  err.status = 404;
  return err;
};

const createValidationError = (err) => {
  err.message = `Validation error: ${err.message}`;
  err.status = 400;
  return err;
};

module.exports = {
  tryCatchWrapper,
  createNotFoundHttpError,
  createValidationError,
};
