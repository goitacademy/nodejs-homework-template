const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = ctrlWrapper;
