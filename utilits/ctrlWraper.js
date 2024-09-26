const ctrlWrapper = (ctrl) => {
  const ctrlFunc = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return ctrlFunc;
};

module.exports = ctrlWrapper;
