/** @format */

const controllerWrapper = (controller) => {
  const wrapper = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return wrapper;
};

module.exports = controllerWrapper;
