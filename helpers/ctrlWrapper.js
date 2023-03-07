function ctrlhWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    }
    catch (error) {
      return next(error);
    }
  };
}

module.exports = ctrlhWrapper;