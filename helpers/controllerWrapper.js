const controllerWrapper = (controller) => {
  const func = async (res, req, next) => {
    try {
      await controller(res, req, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = controllerWrapper;
