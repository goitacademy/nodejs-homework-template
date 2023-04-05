const ctrlWrapper = (ctrl) => {
  const fun = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fun;
};

module.exports = ctrlWrapper;
