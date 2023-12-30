const ctrlWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
