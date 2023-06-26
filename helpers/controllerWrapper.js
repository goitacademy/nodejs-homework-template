const controllerWrapper = (ctlr) => {
  const wrapper = async (req, res, next) => {
    try {
      await ctlr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return wrapper;
};

module.exports = { controllerWrapper };
