const tryCatchWrapper = (asyncFunc) => {
  return async (req, res, next) => {
    try {
      await asyncFunc(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = { tryCatchWrapper };
