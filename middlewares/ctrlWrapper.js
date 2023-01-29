const ctrlWrapper = (ctrl) => {
  return async (req, rea, next) => {
    try {
      await ctrl(req, rea, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = ctrlWrapper;