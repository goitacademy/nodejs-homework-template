const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      return controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
