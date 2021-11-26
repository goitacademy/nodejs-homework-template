const ctrlWrapper = (ctrl) => {
  return (req, res, next) => {
    try {
      ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
