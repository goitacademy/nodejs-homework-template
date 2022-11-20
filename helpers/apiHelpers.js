function asyncWrapper(endPointFn) {
  return async (req, res, next) => {
    try {
      await endPointFn(req, res, next);
    } catch (error) {
      console.error("error:", error);
      next(error);
    }
  };
}

module.exports = asyncWrapper;
