const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error.message.includes("NO.")) {
        error.status = 404;
      }
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
