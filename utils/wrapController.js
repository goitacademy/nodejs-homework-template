const wrapController = (controller) => {
  const wrappedFunction = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return wrappedFunction;
};

module.exports = wrapController;
