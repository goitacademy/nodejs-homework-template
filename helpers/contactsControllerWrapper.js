function controllerWrapper(controller) {
  async function functionWrapper(req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  return functionWrapper;
}

module.exports = controllerWrapper;
