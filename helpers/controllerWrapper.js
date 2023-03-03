function controllerWrapper(controller) {
  const fn = async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
  return fn;
}

module.exports = controllerWrapper;
