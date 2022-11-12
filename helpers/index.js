const tryCatchWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      if (error.name === "MongoServerError") {
        error.status = 400;
        return next(error);
      }
      error.status = 404;
      next(error);
    }
  };
};

module.exports = tryCatchWrapper;
