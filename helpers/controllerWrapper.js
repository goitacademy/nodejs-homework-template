function controllerWrapper(controller) {
  const func = async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
  return func;
}

module.exports = controllerWrapper;
