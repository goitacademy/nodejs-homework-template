const controllerWrapper = (controllerWrapper) => {
  const func = async (req, res, next) => {
    try {
      await controllerWrapper(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = controllerWrapper;
