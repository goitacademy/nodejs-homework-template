const tryCatchWrapper = (asyncFunc) => {
  return async (req, res, next) => {
    try {
      await asyncFunc(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

module.exports = { tryCatchWrapper };
