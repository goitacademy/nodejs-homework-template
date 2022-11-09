const tryCatchWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  };
};

module.exports = tryCatchWrapper;
