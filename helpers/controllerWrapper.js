const controllerWrapper = (ctrl) => {
  const funcWrapper = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return funcWrapper;
};

module.exports = controllerWrapper;
