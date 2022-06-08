const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error?.code === 51024) {
        error.status = 400;
      }
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
