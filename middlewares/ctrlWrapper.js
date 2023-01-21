function ctrlWrapper(ctrl) {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = ctrlWrapper;
