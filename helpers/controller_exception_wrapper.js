const controller_exception_wrapper = (controller) => {
  const fn = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return fn;
};

module.exports = {
  controller_exception_wrapper,
};
