const ctrlWrapper = (req, res, next) => {
  return async (req, res, next) => {
    try {
      await ctrlWrapper(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
